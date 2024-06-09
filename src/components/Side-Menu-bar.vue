<template>
  <div
    class="side_btn text-light"
    id="staticBackdrop"
    aria-labelledby="staticBackdropLabel"
  >
    <div class="offcanvas-header">
      <h3 class="offcanvas-title" id="staticBackdropLabel">
        Orchestration MPLS
      </h3>
    </div>
    <div class="admin_container">
      <img src="/img/avatar.png" alt="" class="avatar" />
      <p class="titles">{{ username ? username : "Administrateur" }}</p>
    </div>
    <div class="offcanvas-body">
      <div class="L3vpn" >
        <h3>L3vpn config</h3>
      <div class="first_config">
        <div class="d-flex">
          <i class="bi bi-tools"></i>
          <h5>VRF Config</h5>
        </div>
        <ul>
          <router-link
            :to="{ name: 'VRF_Config', params: { id: 'Build_VRF' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('Build_VRF') }">
              Build VRF
            </li>
          </router-link>

          <router-link
            :to="{ name: 'VRF_Config', params: { id: 'Remove_VRF' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('Remove_VRF') }">
              Remove VRF
            </li>
          </router-link>
        </ul>
      </div>
      <div class="sec_config">
        <div class="d-flex">
          <i class="bi bi-pc-display-horizontal"></i>
          <h5>Device Config</h5>
        </div>

        <ul>
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'PE_Config' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('PE_Config') }">
              PE Config
            </li></router-link
          >
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'Switch_Config' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('Switch_Config') }">
              Switch Config
            </li></router-link
          >
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'CE_Config' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('CE_Config') }">
              CE Config
            </li></router-link
          >
        </ul>
      </div>
    </div>
    <div class="Test">
      <h3>Test</h3>
     

        <ul>
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'Ping' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('Ping') }">
Ping            </li></router-link
          >
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'Validation' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('Validation') }">
Validation            </li></router-link
          >
        </ul>
      </div>
    </div>
        <div class="sec_config">
        <div class="d-flex all_admin">
          <i class="bi bi-person-add add_admin"></i>
          <router-link :to="{ name: 'register' }" class="router"
            ><h4 :class="{ 'active-link': isActive('register') }">
              Add Admin
            </h4></router-link
          >
        </div>
      </div>
    </div>
  
</template>

<script>
import { useAppStore } from "../store";
export default {
  data() {
    return {};
  },
  computed: {
    username() {
      return useAppStore().username;
    },
  },
  methods: {
    isActive(route) {
      return this.$route.params.id === route || this.$route.name === route;
    },
  },
};
</script>

<style scoped>
.add_admin {
  font-size: 22px;
  display: flex;
}
.active-link {
  padding-left: 10px;
  color: #ea7b22;
}
.router {
  text-decoration: none;
}
.side_btn {
  background-color: #5e72c2;
  width: 325px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}
.offcanvas-header {
  border-bottom: 2px solid #ea7b22;
}

.offcanvas-title {
  margin: 23px 10px;
}
.admin_container {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #ea7b22;
  height: 100px;
  padding: 50px 20px;
}
.titles {
  margin: 23px 20px;
  font-size: 23px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.offcanvas-body {
  margin: 10px 10px;
  text-align: left !important;
}

.avatar {
  width: 60px;
  height: auto;
  object-fit: cover;
}
.first_config,
.sec_config {
  display: flex;
  flex-direction: column;
}

ul li {
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 17px;
  transition: all 0.3s ease-in-out;
  color: #ebeeff;
}
ul li:hover {
  padding-left: 10px;
  color: #ea7b22;
}
.first_config,
.sec_config ul {
  margin-top: 15px;
}

h5 {
  margin-left: 10px;
}
h4 {
  color: white;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
}
h4:hover {
  padding-left: 10px;
  color: #ea7b22;
}
</style>
