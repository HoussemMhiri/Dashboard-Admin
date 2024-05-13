<template>
  <div class="vrf_container">
    <h1 class="text-center m-4">{{ title }}</h1>
    <div class="w-75 m-auto 0">
      <!--     <form @submit.prevent="addVRF"> -->
      <form @submit.prevent="addVRF" v-if="showForm">
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
          <button class="w-100 btn btn-primary">Build</button>
        </div>
      </form>

      <!-- REMOVE -->

      <form v-else>
        <div class="mb-3">
          <label for="exampleFormControlInput5" class="form-label"
            >PE Router:</label
          >
          <input
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
            type="text"
            class="form-control"
            id="exampleFormControlInput6"
          />
        </div>
        <div class="w-100">
          <button class="w-100 btn btn-danger">Remove</button>
        </div>
      </form>
      <!--   <div class="w-100">
        <button
          class="w-100"
          :class="[showForm ? 'btn btn-primary' : 'btn btn-danger']"
        >
          {{ showForm ? "Build" : "Remove" }}
        </button>
      </div> -->

      <!--    </form> -->
    </div>
  </div>
</template>

<script>
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {
      title: "",
      showForm: true,

      VRF_Names: "",
      Rds: "",
      RT_Exports: "",
      RT_Imports: "",
      router: "",
    };
  },
  methods: {
    updateTitle() {
      this.title = this.title.replace(/_/g, " ");
    },
    updateShow() {
      this.showForm = this.$route.params.id === "Build_VRF";
    },
    /* addVRF() {
      setDoc(doc(db, "dataset", this.router), {
        VRF_Name: this.VRF_Names,
        RD: this.Rds,
        RT_Export: this.RT_Exports,
        RT_Import: this.RT_Imports,
      });
      this.VRF_Names = "";
      this.Rds = "";
      this.RT_Exports = "";
      this.RT_Imports = "";
      this.router = "";
    }, */

    async addVRF() {
      const datasetRef = collection(db, "dataset");
      const routerDocRef = doc(datasetRef, this.router);

      try {
        // Check if the document exists
        const docSnapshot = await getDoc(routerDocRef);

        if (docSnapshot.exists()) {
          // Document exists, create a subcollection with the name of VRF_Names
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

        // Clear input fields after adding the data
        this.VRF_Names = "";
        this.Rds = "";
        this.RT_Exports = "";
        this.RT_Imports = "";
        this.router = "";

        console.log("Data added successfully!");
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
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
  margin: 81px auto;
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
