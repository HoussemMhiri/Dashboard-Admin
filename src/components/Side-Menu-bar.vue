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
      <p class="titles">Administrateur</p>
    </div>
    <div class="offcanvas-body">
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
      <div class="sec_config">
        <div class="d-flex">
          <i class="bi bi-arrows-move"></i>
          <h5>Internal Routing</h5>
        </div>

        <ul>
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'OSPF_Config' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('OSPF_Config') }">
              OSPF
            </li></router-link
          >
          <router-link
            :to="{ name: 'Device_Config', params: { id: 'EIGRP_Config' } }"
            class="router"
            ><li :class="{ 'active-link': isActive('EIGRP_Config') }">
              EIGRP
            </li></router-link
          >
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    isActive(route) {
      return this.$route.params.id === route;
    },
  },
};
</script>

<style scoped>
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
  margin: 20px 10px;
  text-align: left !important;
}

.avatar {
  width: 60px;
  height: auto;
  object-fit: cover;
}
.first_config,
.sec_config {
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

ul li {
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 17px;
  transition: all 0.3s ease-in-out;
  color: #ebeeff;
}
ul li:hover {
  padding-left: 10px;
  color: #ea7b22;
}

.sec_config ul {
  margin-top: 20px;
}

h5 {
  margin-left: 10px;
}
</style>
