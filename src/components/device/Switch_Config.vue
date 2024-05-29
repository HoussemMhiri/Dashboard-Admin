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
      <p v-if="errMsg" class="text-danger pt-3">{{ errMsg }}</p>
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
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import popOver from "../reusable/pop-over.vue";
import Modal from "../reusable/modal.vue";
import { API_BASE_URL } from "../../config";
export default {
  components: { popOver, Modal },
  data() {
    return {
      formattedResponseSw: null,
      hostname: "",
      cust: "",
      inter: "",
      vl: "",
      errMsg: "",
    };
  },

  methods: {
    // the same as build (can have multiple customers also)
    async addSwitch() {
      const datasetRef = collection(db, "dataset");
      const routerDocRef = doc(datasetRef, this.hostname);

      try {
        // Check if the document exists
        const docSnapshot = await getDoc(routerDocRef);

        if (docSnapshot.exists()) {
          // Document exists, check if VRF name subcollection exists
          const vrfNameSubcollectionRef = collection(routerDocRef, this.cust);
          const vrfNameSnapshot = await getDocs(vrfNameSubcollectionRef);

          if (vrfNameSnapshot.size > 0) {
            // VRF name subcollection exists, set error message
            this.errMsg = "This VRF Name is already exist";
            return; // Exit the function
          } else {
            // VRF name subcollection doesn't exist, create it
            this.errMsg = "";
            await addDoc(vrfNameSubcollectionRef, {
              cust: this.cust,
              inter: this.inter,
              vl: this.vl,
            });
          }
        } else {
          // Document does not exist, create it and add the provided information
          await setDoc(routerDocRef, {});

          // Create a subcollection with the name of VRF_Names
          const vrfNameSubcollectionRef = collection(routerDocRef, this.cust);

          // Add additional information to the subcollection
          await addDoc(vrfNameSubcollectionRef, {
            cust: this.cust,
            inter: this.inter,
            vl: this.vl,
          });
        }

        // Reset input values
        this.hostname = "";
        this.cust = "";
        this.inter = "";
        this.vl = "";
      } catch (error) {
        console.error(error);
      }
    },

    async postSwitch() {
      this.addSwitch();
      let switchData = {
        hostname: this.hostname,
        customer: this.cust,
        interface: this.inter,
        vlan: this.vl,
      };
      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/addSwitch`,
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
