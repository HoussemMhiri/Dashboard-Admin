<template>
  <form>
    <div class="mb-3">
      <label for="exampleFormControlInput8" class="form-label"
        >Switch Name:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput8"
        v-model="hostname"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput8" class="form-label">Customer:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput8"
        v-model="cust"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput9" class="form-label">Inerface:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput9"
        v-model="inter"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput10" class="form-label">VLAN:</label>
      <input
        type="number"
        class="form-control"
        id="exampleFormControlInput10"
        v-model="vl"
      />
    </div>
    <div class="w-100">
      <!--    <button class="btn btn-primary w-100" type="submit">Submit</button> -->
      <pop-over :postData="postSwitch" />
    </div>
    <modal :result="formattedResponseSw" />
  </form>
</template>

<script>
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import popOver from "../reusable/pop-over.vue";
import Modal from "../reusable/modal.vue";
export default {
  components: { popOver, Modal },
  data() {
    return {
      formattedResponseSw: null,
      hostname: "",
      cust: "",
      inter: "",
      vl: "",
    };
  },

  methods: {
    // the same as build (can have multiple customers also)
    async addSwitch() {
      const datasetRef = collection(db, "dataset");
      const routerDocRef = doc(datasetRef, this.sw);

      try {
        // Check if the document exists
        const docSnapshot = await getDoc(routerDocRef);

        if (docSnapshot.exists()) {
          // Document exists, create a subcollection with the name of VRF_Names
          const vrfNameSubcollectionRef = collection(routerDocRef, this.cust);

          // Add additional information to the subcollection
          await addDoc(vrfNameSubcollectionRef, {
            interface: this.inter,
            vlan: this.vl,
          });
        } else {
          // Document does not exist, create it and add the provided information
          await setDoc(routerDocRef, {});

          // Create a subcollection with the name of VRF_Names
          const vrfNameSubcollectionRef = collection(routerDocRef, this.cust);

          // Add additional information to the subcollection
          await addDoc(vrfNameSubcollectionRef, {
            interface: this.inter,
            vlan: this.vl,
          });
        }

        this.sw = "";
        this.cust = "";
        this.inter = "";
        this.vl = "";
      } catch (error) {
        console.error(error);
      }
    },

    async postSwitch() {
      let switchData = {
        hostname: this.hostname,
        customer: this.cust,
        interface: this.inter,
        vlan: this.vl,
      };
      try {
        const { data } = await axios.post(
          "https://9c5b-197-244-82-237.ngrok-free.app/addSwitch",
          switchData
        );
        // render template logic
        const formattedResponse = data.html.replace(
          /\x1B\[[0-9;]*[JKmsu]/g,
          ""
        );
        this.formattedResponseSw = formattedResponse;
        this.showModal();
        console.log(data.html);
        this.hostname = "";
        this.cust = "";
        this.inter = "";
        this.vl = "";
      } catch (error) {
        console.log(error);
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

<style scopd>
label {
  font-weight: 500;
}

h1 {
  color: #434656;
}
</style>
