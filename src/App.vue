<template>
  <div>
    <Nav-Bar v-if="showViews" />
    <div :class="[!showViews ? 'views' : '']">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/Nav-Bar.vue";
export default {
  components: { NavBar },
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
      this.showViews =
        this.$route.name !== "login" && this.$route.name !== "register" && this.$route.name !== "ForgotPassword" &&  this.$route.name !== "not-found";
    },
  },
  created() {
    this.updateViews();
  },
};
</script>

<style>
.views {
  background-color: #dbeafe;
  height: 100vh;
  padding-top: 10rem;
}
</style>
