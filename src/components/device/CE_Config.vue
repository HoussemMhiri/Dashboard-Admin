<template>
  <form>
    <div class="mb-3">
      <label for="exampleFormControlInput11" class="form-label"
        >CE Router:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput11"
        v-model="ce"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput12" class="form-label"
        >Interface:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput12"
        v-model="inter"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput13" class="form-label"
        >IP Address:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput13"
        v-model="ip"
      />
      <p v-if="errMsgCE" class="text-danger pt-3">{{ errMsgCE }}</p>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput14" class="form-label">Mask:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput14"
        v-model="mask"
      />
    </div>

    <div class="w-100">
      <!--  <button class="btn btn-primary w-100">Submit</button> -->
      <pop-over :postData="postCE" />
    </div>
    <modal :result="formattedResponseCE" />
  </form>
</template>

<script>
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import popOver from "../reusable/pop-over.vue";
import Modal from "../reusable/modal.vue";
import { API_BASE_URL } from "../../config";
export default {
  components: { popOver, Modal },
  data() {
    return {
      formattedResponseCE: null,
      ce: "",
      inter: "",
      ip: "",
      mask: "",
      errMsgCE: "",
    };
  },
  methods: {
    // error if it has the same ce router

    async addCE() {
      const ceRef = doc(db, "dataset", this.ce);

      try {
        const ceDoc = await getDoc(ceRef);

        if (ceDoc.exists()) {
          // Check if the IP address matches
          if (ceDoc.data().ip_address === this.ip) {
            // Update the document if the IP address matches
            await setDoc(
              ceRef,
              {
                ce_router: this.ce,
                interface: this.inter,
                ip_address: this.ip,
                mask: this.mask,
              },
              { merge: true }
            );
            console.log("Document updated successfully.");
          } else {
            // Return an error if the IP address does not match
            /*     throw new Error("The IP address does not match."); */
            this.errMsgCE = "The IP address does not match.";
          }
        } else {
          // Create a new document if it does not exist
          await setDoc(ceRef, {
            ce_router: this.ce,
            interface: this.inter,
            ip_address: this.ip,
            mask: this.mask,
          });
          console.log("Document created successfully.");
          // Clear the form fields
          this.ce = "";
          this.inter = "";
          this.ip = "";
          this.mask = "";
        }
      } catch (error) {
        console.error("Error adding/updating document: ", error);
      }
    },

    //Modal
    showModal() {
      // Use jQuery to show the modal
      $("#resultModal").modal("show");
    },

    async postCE() {
      this.addCE();
      let ceData = {
        hostname: this.ce,
        Interface: this.inter,
        addr: this.ip,
        Mask: this.mask,
      };
      try {
        const { data } = await axios.post(`${API_BASE_URL}/addCE`, ceData);
        // render template logic
        const formattedResponse = data.html.replace(
          /\x1B\[[0-9;]*[JKmsu]/g,
          ""
        );
        this.formattedResponseCE = formattedResponse;
        this.showModal();
        console.log(data.html);
        this.ce = "";
        this.inter = "";
        this.ip = "";
        this.mask = "";
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
