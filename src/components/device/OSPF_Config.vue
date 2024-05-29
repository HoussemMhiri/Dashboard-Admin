<template>
  <form action="">
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label">Router:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="hostname"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label"
        >Customer:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="customer"
      />
    </div>

    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label">OSPF:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="ospf"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label">Area:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="area"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput14" class="form-label"
        >Network Address:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput14"
        v-model="network_address"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label"
        >Wildcard Mask:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="wildcard_mask"
      />
    </div>

    <div class="w-100">
      <pop-over :postData="addOSPF" />
    </div>
    <modal :result="formattedResponseOSPF" />
  </form>
</template>

<script>
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import Modal from "../reusable/modal.vue";
import popOver from "../reusable/pop-over.vue";
import { API_BASE_URL } from "../../config";
export default {
  components: { popOver, Modal },
  data() {
    return {
      formattedResponseOSPF: null,
      hostname: "",
      customer: "",
      ospf: "",
      area: "",
      network_address: "",
      wildcard_mask: "",
    };
  },

  methods: {
    async addOSPF() {
      try {
        this.postOSPF();
        let sendOspf = {
          hostname: this.hostname,
          customer: this.customer,
          ospf: this.ospf,
          area: this.area,
          network_address: this.network_address,
          wildcard_mask: this.wildcard_mask,
        };
        const { data } = await axios.post(`${API_BASE_URL}/addOspf`, sendOspf);
        console.log(data);
        // render template logic
        const formattedResponse = data.html.replace(
          /\x1B\[[0-9;]*[JKmsu]/g,
          ""
        );
        this.formattedResponseOSPF = formattedResponse;
        this.showModal();
        console.log(data.html);
        // Clear the form fields
        this.hostname = "";
        this.customer = "";
        this.ospf = "";
        this.area = "";
        this.network_address = "";
        this.wildcard_mask = "";
      } catch (error) {
        console.log(error);
      }
    },

    // OSPF DB
    // add to the router ospf filed only, and create new doc called ospf that will take all ospf value each one as the name of the collection and inside it take the rest of fields
    async postOSPF() {
      try {
        // Check if required fields are provided
        if (!this.hostname || !this.customer || !this.ospf) {
          console.error("Hostname, customer, and OSPF are required");
          return;
        }

        // Get a reference to the dataset collection
        const datasetRef = collection(db, "dataset");

        // Get a reference to the router document
        const routerDocRef = doc(datasetRef, this.hostname);

        // Check if the router document exists
        const routerDocSnapshot = await getDoc(routerDocRef);
        if (!routerDocSnapshot.exists()) {
          console.error(`Router with hostname ${this.hostname} does not exist`);
          return;
        }

        // Create a reference to the subcollection with the provided customer name
        const customerSubcollectionRef = collection(
          routerDocRef,
          this.customer
        );

        // Construct a query to efficiently retrieve existing documents
        const existingDocQuery = query(customerSubcollectionRef, limit(1));

        // Execute the query to fetch at most one document
        const existingDocSnapshot = await getDocs(existingDocQuery);

        // Get the reference to the single document or create a new one if it doesn't exist
        const customerDocRef = existingDocSnapshot.empty
          ? doc(customerSubcollectionRef)
          : existingDocSnapshot.docs[0].ref;

        // Get the current OSPF field value from the customer document
        const customerDocSnapshot = await getDoc(customerDocRef);
        let ospfArray = [];
        if (customerDocSnapshot.exists()) {
          const existingOspf = customerDocSnapshot.get("ospf");
          if (Array.isArray(existingOspf)) {
            ospfArray = existingOspf;
          } else if (existingOspf) {
            ospfArray.push(existingOspf);
          }
        }

        // Add the new OSPF value to the array
        ospfArray.push(this.ospf);

        // Update the OSPF field in the customer document
        await updateDoc(customerDocRef, { ospf: ospfArray });

        // Create a reference to the "ospf" document
        const ospfDocRef = doc(datasetRef, "ospf");

        await setDoc(ospfDocRef, {});

        // Create a reference to the subcollection under the "ospf" document with the name of the OSPF value
        const ospfSubcollectionRef = collection(ospfDocRef, this.ospf);

        // Set the OSPF subcollection document with the provided fields
        await addDoc(ospfSubcollectionRef, {
          area: this.area,
          network_address: this.network_address,
          wildcard_mask: this.wildcard_mask,
        });

        console.log(
          `OSPF ${this.ospf} added successfully for customer ${this.customer}`
        );
      } catch (error) {
        console.error("Error adding OSPF:", error);
      }
    },
    // Modal
    showModal() {
      // Use jQuery to show the modal
      $("#resultModal").modal("show");
    },
  },
};
</script>

<style></style>
