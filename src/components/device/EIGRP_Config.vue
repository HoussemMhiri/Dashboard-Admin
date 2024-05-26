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
      <label for="exampleFormControlInput15" class="form-label">EIGRP:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="eigrp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput14" class="form-label"
        >Autonomous System:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput14"
        v-model="as"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label"
        >Network Address:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
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
      <pop-over :postData="postEIGRP" />
    </div>
    <modal :result="formattedResponseEIGRP" />
  </form>
</template>

<script>
import axios from "axios";
import Modal from "../reusable/modal.vue";
import popOver from "../reusable/pop-over.vue";
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
export default {
  components: { popOver, Modal },
  data() {
    return {
      formattedResponseEIGRP: null,

      hostname: "",
      customer: "",
      eigrp: "",
      as: "",
      network_address: "",
      wildcard_mask: "",
    };
  },

  methods: {
    async addEIGRP() {
      try {
        let sendEigrp = {
          hostname: this.hostname,
          eigrp: this.eigrp,
          as: this.as,
          network_address: this.network_address,
          wildcard_mask: this.wildcard_mask,
        };
        const { data } = await axios.post(
          "https://2a04-197-244-82-237.ngrok-free.app/addEigrp",
          sendEigrp
        );
        console.log(data.html);
        // render template logic
        const formattedResponse = data.html.replace(
          /\x1B\[[0-9;]*[JKmsu]/g,
          ""
        );
        this.formattedResponseEIGRP = formattedResponse;
        this.showModal();
        console.log(data.html);
        /*   this.ospfForm = {}; */
      } catch (error) {
        console.log(error);
      }
    },

    // DB

    async postEIGRP() {
      try {
        // Check if required fields are provided
        if (!this.hostname || !this.customer || !this.eigrp) {
          console.error("Hostname, customer, and EIGRP are required");
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

        // Get the current eigrp field value from the customer document
        const customerDocSnapshot = await getDoc(customerDocRef);
        let eigrpArray = [];
        if (customerDocSnapshot.exists()) {
          const existingEigrp = customerDocSnapshot.get("eigrp");
          if (Array.isArray(existingEigrp)) {
            eigrpArray = existingEigrp;
          } else if (existingEigrp) {
            eigrpArray.push(existingEigrp);
          }
        }

        // Add the new OSPF value to the array
        eigrpArray.push(this.eigrp);

        // Update the OSPF field in the customer document
        await updateDoc(customerDocRef, { eigrp: eigrpArray });

        // Create a reference to the "ospf" document
        const eigrpDocRef = doc(datasetRef, "eigrp");

        await setDoc(eigrpDocRef, {});

        // Create a reference to the subcollection under the "eigrp" document with the name of the EIGRP value
        const eigrpSubcollectionRef = collection(eigrpDocRef, this.eigrp);

        // Set the EIGRP subcollection document with the provided fields
        await addDoc(eigrpSubcollectionRef, {
          as: this.as,
          network_address: this.network_address,
          wildcard_mask: this.wildcard_mask,
        });

        console.log(
          `EIGRP ${this.eigrp} added successfully for customer ${this.customer}`
        );
      } catch (error) {
        console.error("Error adding EIGRP:", error);
      }
    },

    // MOdal
    showModal() {
      // Use jQuery to show the modal
      $("#resultModal").modal("show");
    },
  },
};
</script>

<style></style>
