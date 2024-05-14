<template>
  <form @submit.prevent="addPE">
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
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
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
          const routerData = docSnapshot.data();

          // Check if a subcollection with the provided VRF name exists within the document
          if (routerData && routerData[this.VRF_Names]) {
            // Subcollection with the provided VRF name exists, update the existing document and subcollection

            // Get a reference to the existing subcollection
            const vrfNameSubcollectionRef = collection(
              routerDocRef,
              this.VRF_Names
            );

            // Add additional information to the existing subcollection
            await addDoc(vrfNameSubcollectionRef, {
              interface: this.inter,
              vlan: this.vl,
              ip_address: this.ip,
              mask: this.mask,
              ospf: this.ospf,
            });
          } else {
            // Subcollection with the provided VRF name does not exist, create a new subcollection and add the additional information

            // Create a subcollection with the provided VRF name
            const vrfNameSubcollectionRef = collection(
              routerDocRef,
              this.VRF_Names
            );

            // Add additional information to the new subcollection
            await addDoc(vrfNameSubcollectionRef, {
              interface: this.inter,
              vlan: this.vl,
              ip_address: this.ip,
              mask: this.mask,
              ospf: this.ospf,
            });
          }
        } else {
          // Document does not exist, create it and add the provided information

          // Create the document with the PE router ID
          await setDoc(routerDocRef, {});

          // Create a subcollection with the provided VRF name
          const vrfNameSubcollectionRef = collection(
            routerDocRef,
            this.VRF_Names
          );

          // Add additional information to the new subcollection
          await addDoc(vrfNameSubcollectionRef, {
            interface: this.inter,
            vlan: this.vl,
            ip_address: this.ip,
            mask: this.mask,
            ospf: this.ospf,
          });
        }

        // Clear input fields after adding the data
        this.pe = "";
        this.VRF_Names = "";
        this.inter = "";
        this.vl = "";
        this.ip = "";
        this.mask = "";
        this.ospf = "";
      } catch (error) {
        console.error(error);
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
