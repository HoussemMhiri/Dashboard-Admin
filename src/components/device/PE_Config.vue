<template>
  <form>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label"
        >PE Router:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput1"
        v-model="pe"
      />
      <p v-if="errMsgRouter" class="text-danger pt-3">{{ errMsgRouter }}</p>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput2" class="form-label">VRF Name:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput2"
        v-model="VRF_Names"
      />
      <p v-if="errMsgCust" class="text-danger pt-3">{{ errMsgCust }}</p>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput3" class="form-label"
        >Interface:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput3"
        v-model="inter"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput4" class="form-label">VLAN:</label>
      <input
        type="number"
        class="form-control"
        id="exampleFormControlInput4"
        v-model="vl"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput5" class="form-label"
        >IP Address:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput5"
        v-model="ip"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput6" class="form-label">Mask:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput6"
        v-model="mask"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput7" class="form-label">OSPF:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput7"
        v-model="ospf"
      />
    </div>
    <div class="w-100">
      <!--      <button class="btn btn-primary w-100">Submit</button> -->
      <pop-over :postData="postPE" />
    </div>
    <modal :result="formattedResponsePE" />
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
  updateDoc,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import popOver from "../reusable/pop-over.vue";
import Modal from "../reusable/modal.vue";
export default {
  components: { popOver, Modal },
  data() {
    return {
      //
      formattedResponsePE: null,
      pe: "",
      VRF_Names: "",
      inter: "",
      vl: "",
      ip: "",
      mask: "",
      ospf: "",
      errMsgCust: "",
      errMsgRouter: "",
    };
  },

  methods: {
    // if router and customer exists (the two is the condition) , add the info (except the customer and router) to that customer in that router
    // else error: please verify your inforamtion

    async addPE() {
      const datasetRef = collection(db, "dataset");
      const routerDocRef = doc(datasetRef, this.pe);

      try {
        // Check if the document exists
        const docSnapshot = await getDoc(routerDocRef);

        if (docSnapshot.exists()) {
          // Document exists, proceed to find or add to subcollection
          const vrfName = this.VRF_Names;

          // Create a reference to the subcollection with the provided VRF name
          const vrfNameSubcollectionRef = collection(routerDocRef, vrfName);

          // Construct a query to efficiently retrieve existing documents
          const existingDocQuery = query(vrfNameSubcollectionRef, limit(1));

          // Execute the query to fetch at most one document
          const existingDocSnapshot = await getDocs(existingDocQuery);

          if (!existingDocSnapshot.empty) {
            // Subcollection document exists, update it
            const existingDocRef = existingDocSnapshot.docs[0].ref;

            await updateDoc(existingDocRef, {
              interface: this.inter,
              vlan: this.vl,
              ip_address: this.ip,
              mask: this.mask,
              ospf: this.ospf,
            });

            console.log(
              "Successfully updated document in subcollection:",
              vrfName
            );
            // Clear input fields after successful operation
            this.pe = "";
            this.VRF_Names = "";
            this.inter = "";
            this.vl = "";
            this.ip = "";
            this.mask = "";
            this.ospf = "";
            this.errMsgCust = "";
            this.errMsgRouter = "";
          } else {
            // Subcollection document doesn't exist, create it and add document

            console.log("customer does not exist:", vrfName);
            this.errMsgCust = "Customer Not Found";
          }
        } else {
          // Document does not exist, handle this case if necessary (e.g., create the document)
          console.log("Document not found:", this.pe); // Or throw an error if required
          this.errMsgRouter = "Router Not Found";
        }
      } catch (error) {
        console.error("Error adding PE:", error);
      }
    },

    async postPE() {
      try {
        this.addPE();
        const peData = {
          hostname: this.pe,
          VRF_Name: this.VRF_Names,
          Interface: this.inter,
          VLAN: this.vl,
          IP_Address: this.ip,
          Mask: this.mask,
          OSPF: this.ospf,
        };
        const { data } = await axios.post(
          "https://2a04-197-244-82-237.ngrok-free.app/addPE",
          peData
        );

        // render template logic
        const formattedResponse = data.html.replace(
          /\x1B\[[0-9;]*[JKmsu]/g,
          ""
        );
        this.formattedResponsePE = formattedResponse;
        this.showModal();
        console.log(data.html);
        this.pe = "";
        this.VRF_Names = "";
        this.inter = "";
        this.vl = "";
        this.ip = "";
        this.mask = "";
        this.ospf = "";
      } catch (error) {
        console.log(error);
      }
    },

    //Modal
    showModal() {
      // Use jQuery to show the modal
      $("#resultModal").modal("show");
    },
  },
};
</script>

<style scopd>
label {
  font-weight: 500;
}

h1 {
  color: #434656;
}
</style>
