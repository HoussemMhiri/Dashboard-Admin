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
        <div class="col"><Logout /></div>
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
</style>
