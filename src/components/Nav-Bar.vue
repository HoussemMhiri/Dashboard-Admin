<template>
  <div class="all_container">
    <div class="container text-center">
      <div class="row row_cont">
        <div class="col">
          <Side-Menu-bar />
        </div>
        <div class="col">
          <img src="/img/3S.png" alt="" class="imgs" />
        </div>
        <div class="col p">Gestion BackBone MPLS 3S</div>
        <div class="col d-flex two_btn">
          <router-link v-if="showViews" to="/">
            <button class="home_btn">Home</button>
          </router-link>

          <Logout />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logout from "./Logout.vue";
import SideMenuBar from "./Side-Menu-bar.vue";
import VRFForm from "./VRF-Form.vue";
export default {
  components: { SideMenuBar, Logout, VRFForm },
  data() {
    return {
      showViews: false,
    };
  },
  watch: {
    $route() {
      this.updateViews();
    },
  },
  methods: {
    updateViews() {
      this.showViews = this.$route.name !== "home";
    },
  },
  created() {
    this.updateViews();
  },
};
</script>

<style scoped>
.imgs {
  width: 150px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}
.imgss {
  width: 140px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
}
.all_container {
  background-color: #ebeeff;
  position: sticky;
  top: 0;
}

.row_cont {
  display: flex;
  align-items: center;
}

.p {
  letter-spacing: 0.4px;
  font-size: 25px;
  font-weight: 600;
  color: #434656;
}

.home_btn {
  background-color: #5e72c2;
  border: none;
  border-radius: 5px;
  width: 80px;
  height: 42px;
}

a .home_btn {
  color: white;
  text-decoration: none;
}

.home_btn:hover {
  background-color: white;
  border: 1px solid #5e72c2;
  transition: all 0.1s ease-in;
}
a .home_btn:hover {
  color: #434656;
  text-decoration: none;
}

.two_btn {
  padding-left: 10px;
}
</style>
