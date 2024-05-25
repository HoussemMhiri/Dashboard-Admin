<template>
  <div class="all_container">
    <div class="arch_pie">
      <div>
        <img src="/img/archNew.png" alt="" class="arch_img" />
      </div>
      <pie-part v-if="dbData" :dbData="dbData" />
    </div>
    <div class="tb_container">
      <Tb v-if="dbData" :dbData="dbData" />
    </div>
  </div>
</template>

<script>
import piePart from "@/components/dashboard/pie-part.vue";
import Tb from "@/components/dashboard/Tb.vue";
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
  getFirestore,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/firebase";

export default {
  components: { piePart, Tb },
  data() {
    return {
      dbData: [],
    };
  },

  methods: {
    async fetchDataset() {
      try {
        const db = getFirestore();
        const datasetRef = collection(db, "dataset");

        const querySnapshot = await getDocs(datasetRef);
        const documents = [];

        querySnapshot.forEach((doc) => {
          documents.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        this.dbData = documents;
        console.log(documents);
      } catch (error) {
        console.error("Error fetching dataset:", error);
      }
    },
  },
  mounted() {
    this.fetchDataset();
  },
};
</script>

<style scoped>
.all_container {
  /*   border: 1px solid black; */
  margin-left: 325px;
}
.arch_pie {
  display: flex;
  justify-content: space-between;
  /*   border: 1px solid red; */
  padding-top: 30px;
}
.arch_img {
  width: 700px;
  object-fit: contain;
}

.tb_container {
  /* border: 1px solid black; */
  padding-top: 30px;
}
</style>
