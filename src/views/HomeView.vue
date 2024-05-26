<template>
  <div class="all_container">
    <div class="arch_pie">
      <div class="archt">
        <h3 class="text-center">Backbone IP/MPLS</h3>
        <img src="/img/arch_org.png" alt="" class="arch_img" />
      </div>
      <div class="the_pie">
        <pie-part v-if="dbData" :dbData="dbData" />
      </div>
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
h3 {
  color: #434656;
  margin-top: 20px;
}
.all_container {
  /*   border: 1px solid black; */
  margin-left: 325px;
  background-color: #f5f5f5;
}
.arch_pie {
  display: flex;
  /*   justify-content: space-between; */
  /*   border: 1px solid red; */
  /*   padding-top: 0px; */
}
.arch_img {
  margin-top: 10px;
  width: 650px;
  object-fit: contain;
}

.archt {
  background-color: white;
  box-shadow: 0 2px 4px #5e72c2;
  border-radius: 5px;
  width: 55%;
  margin: 10px;
}
.the_pie {
  margin: 10px;
  /*   border: 1px solid black; */
  width: 500px;
}
</style>
