<template>
  <div class="vrf_container">
    <h1 class="text-center m-4">{{ title }}</h1>
    <div class="w-75 m-auto 0">
      <form v-if="showForm">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >Router:</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            v-model="router"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label"
            >VRF Name:</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            v-model="VRF_Names"
          />

          <!--  <p class="text-danger pt-3">{{ errMsg }}</p> -->
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput2" class="form-label">RD:</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput2"
            v-model="Rds"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput3" class="form-label"
            >RT Export:</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput3"
            v-model="RT_Exports"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput4" class="form-label"
            >RT Import:</label
          >
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput4"
            v-model="RT_Imports"
          />
        </div>

        <div class="w-100">
          <!--  <button class="w-100 btn btn-primary">Build</button> -->
          <pop-over :postData="postData" />
        </div>
      </form>

      <!-- REMOVE -->

      <form v-else @submit.prevent="removeData">
        <div class="mb-3">
          <label for="exampleFormControlInput5" class="form-label"
            >PE Router:</label
          >
          <input
            v-model="PE_router"
            type="text"
            class="form-control"
            id="exampleFormControlInput5"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput6" class="form-label"
            >VRF Name:</label
          >
          <input
            v-model="VRF_Name"
            type="text"
            class="form-control"
            id="exampleFormControlInput6"
          />
        </div>
        <div class="w-100">
          <!--  <button class="w-100 btn btn-danger">Remove</button> -->
          <pop-over :postData="removeData" bgColor="true" />
        </div>
      </form>
    </div>
  </div>
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
import modal from "./reusable/modal.vue";
import PopOver from "./reusable/pop-over.vue";

export default {
  components: { modal, PopOver },
  data() {
    return {
      title: "",
      showForm: true,
      // Build
      VRF_Names: "",
      Rds: "",
      RT_Exports: "",
      RT_Imports: "",
      router: "",

      errMsg: "",
      // Remove
      PE_router: "",
      VRF_Name: "",
    };
  },
  methods: {
    updateTitle() {
      this.title = this.title.replace(/_/g, " ");
    },
    updateShow() {
      this.showForm = this.$route.params.id === "Build_VRF";
    },

    async postData() {
      try {
        const dataToPost = {
          hostname: this.router,
          vrfName: this.VRF_Names,
          rd: this.Rds,
          rt_export: this.RT_Exports,
          rt_import: this.RT_Imports,
        };
        const { data } = await axios.post(
          "https://9423-197-1-90-20.ngrok-free.app/addConfig",
          dataToPost,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        this.router = "";
        this.VRF_Names = "";
        this.Rds = "";
        this.RT_Exports = "";
        this.RT_Imports = "";
      } catch (error) {
        console.log(error);
      }
    },
    async addVRF() {
      const datasetRef = collection(db, "dataset");
      const routerDocRef = doc(datasetRef, this.router);

      try {
        // Check if the document exists
        const docSnapshot = await getDoc(routerDocRef);

        if (docSnapshot.exists()) {
          // Document exists, check if VRF name subcollection exists
          const vrfNameSubcollectionRef = collection(
            routerDocRef,
            this.VRF_Names
          );
          const vrfNameSnapshot = await getDocs(vrfNameSubcollectionRef);

          if (vrfNameSnapshot.size > 0) {
            // VRF name subcollection exists, set error message
            this.errMsg = "This VRF Name is already exist";
            return; // Exit the function
          } else {
            // VRF name subcollection doesn't exist, create it
            await addDoc(vrfNameSubcollectionRef, {
              RD: this.Rds,
              RT_Export: this.RT_Exports,
              RT_Import: this.RT_Imports,
            });
          }
        } else {
          // Document does not exist, create it and add the provided information
          await setDoc(routerDocRef, {});

          // Create a subcollection with the name of VRF_Names
          const vrfNameSubcollectionRef = collection(
            routerDocRef,
            this.VRF_Names
          );

          // Add additional information to the subcollection
          await addDoc(vrfNameSubcollectionRef, {
            RD: this.Rds,
            RT_Export: this.RT_Exports,
            RT_Import: this.RT_Imports,
          });
        }

        // Reset input values
        this.VRF_Names = "";
        this.Rds = "";
        this.RT_Exports = "";
        this.RT_Imports = "";
        this.router = "";
      } catch (error) {
        console.error(error);
      }
    },
    // remove data from the template => backend connection
    async removeData() {
      try {
        const dataToPost = {
          hostname: this.PE_router,
          vrfName: this.VRF_Name,
        };
        const response = await axios.post(
          "https://9423-197-1-90-20.ngrok-free.app/removeConfig",
          dataToPost,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        this.PE_router = "";
        this.VRF_Name = "";
      } catch (error) {
        console.log(error);
      }
    },
    // remove data from the database => database update
  },
  created() {
    this.title = this.$route.params.id;
    this.updateTitle();
    this.updateShow();
  },

  watch: {
    $route() {
      this.title = this.$route.params.id;
      this.updateTitle();
      this.updateShow();
    },
  },
};
</script>

<style scoped>
.vrf_container {
  margin: 30px auto;
  border-radius: 5px;
  margin-left: 35rem;
  width: 50%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem 0;
  background-color: #ebeeff;
}

label {
  font-weight: 500;
}

h1 {
  color: #434656;
}
</style>
