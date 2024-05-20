<template>
  <form @submit.prevent="postPE">
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
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput2" class="form-label">VRF Name:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput2"
        v-model="VRF_Names"
      />
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
      <button class="btn btn-primary w-100">Submit</button>
    </div>
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
export default {
  data() {
    return {
      pe: "",
      VRF_Names: "",
      inter: "",
      vl: "",
      ip: "",
      mask: "",
      ospf: "",
    };
  },

  methods: {
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
          } else {
            // Subcollection document doesn't exist, create it and add document
            await addDoc(vrfNameSubcollectionRef, {
              interface: this.inter,
              vlan: this.vl,
              ip_address: this.ip,
              mask: this.mask,
              ospf: this.ospf,
            });

            console.log(
              "Successfully added document to subcollection:",
              vrfName
            );
          }
        } else {
          // Document does not exist, handle this case if necessary (e.g., create the document)
          console.log("Document not found:", this.pe); // Or throw an error if required
        }

        // Clear input fields after successful operation
        this.pe = "";
        this.VRF_Names = "";
        this.inter = "";
        this.vl = "";
        this.ip = "";
        this.mask = "";
        this.ospf = "";
      } catch (error) {
        console.error("Error adding PE:", error);
      }
    },

    async postPE() {
      try {
        const peData = {
          hostname: this.pe,
          VRF_Name: this.VRF_Names,
          Interface: this.inter,
          VLAN: this.vl,
          IP_Address: this.ip,
          Mask: this.mask,
          OSPF: this.ospf,
        };
        const {data} = await axios.post(
          "https://e5b9-197-1-90-20.ngrok-free.app/addPE",peData);
        console.log(data);
        this.pe= "";
        this.VRF_Names= "";
        this.inter= "";
        this.vl= "";
        this.ip= "";
        this.mask= "";
        this.ospf= "";
      } catch (error) {
        console.log(error);
      }
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
