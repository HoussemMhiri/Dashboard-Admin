<template>
    <form>
        <div class="mb-3">
        <label for="exampleFormControlInput8" class="form-label"
          >Device name :</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput8"
          v-model="hostname"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput8" class="form-label"
          >Ping to device:</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput8"
          v-model="Ping"
        />
      </div>
      <div class="w-100">
        <!--    <button class="btn btn-primary w-100" type="submit">Submit</button> -->
        <pop-over :postData="postPing" />
      </div>
      <modal :result="formattedResponseSw" />
    </form>
  </template>
  
  <script>
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
        Ping: "",
        errMsg: "",
      };
    },
  
    methods: {
      // the same as build (can have multiple customers also)
      async postPing() {
        let PingData = {
          hostname: this.hostname,
          Ping: this.Ping,
        };
        try {
          const { data } = await axios.post(
            `${API_BASE_URL}/addPing`,
            PingData
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
          this.Ping = "";
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
  