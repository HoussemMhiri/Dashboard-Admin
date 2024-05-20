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
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label">OSPF:</label>
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="ospf"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput14" class="form-label"
        >Network Address:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput14"
        v-model="network_address"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput15" class="form-label"
        >Wildcard Mask:</label
      >
      <input
        type="text"
        class="form-control"
        id="exampleFormControlInput15"
        v-model="wildcard_mask"
      />
    </div>
    <div class="w-100">
      <!--  <button class="btn btn-primary w-100">Submit</button> -->
      <pop-over :postData="postCE" />
    </div>
  </form>
</template>

<script>
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import popOver from "../reusable/pop-over.vue";
export default {
  components: { popOver },
  data() {
    return {
      ce: "",
      inter: "",
      ip: "",
      mask: "",
      ospf: "",
      network_address: "",
      wildcard_mask: "",
    };
  },
  methods: {
    async addCE() {
      setDoc(doc(db, "dataset", this.ce), {
        ce_router: this.ce,
        interface: this.inter,
        ip_address: this.ip,
        mask: this.mask,
        ospf: this.ospf,
      });

      this.ce = "";
      this.inter = "";
      this.ip = "";
      this.mask = "";
      this.ospf = "";
    },

    async postCE() {
      let ceData = {
        hostname: this.ce,
        Interface: this.inter,
        IP_Address: this.ip,
        Mask: this.mask,
        OSPF: this.ospf,
        network_address: this.network_address,
        wildcard_mask: this.wildcard_mask,
      };
      try {
        const { data } = await axios.post("/addCE", ceData);
        console.log(data);
        this.ce = "";
        this.inter = "";
        this.ip = "";
        this.mask = "";
        this.ospf = "";
        this.network_address = "";
        this.wildcard_mask = "";
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
