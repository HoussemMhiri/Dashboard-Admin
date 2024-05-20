<template>
  <div class="vrf_container">
    <h1 class="text-center m-4">{{ title }}</h1>
    <div class="w-75 m-auto 0">
      <component :is="currentForm" />
    </div>
  </div>
</template>

<script>
import CE_Config from "./device/CE_Config.vue";
import PE_Config from "./device/PE_Config.vue";
import Switch_Config from "./device/Switch_Config.vue";
export default {
  components: { PE_Config, Switch_Config, CE_Config },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    updateTitle() {
      this.title = this.$route.params.id.replace(/_/g, " ");
    },
  },
  created() {
    this.updateTitle();
  },
  computed: {
    currentForm() {
      const componentName = this.$route.params.id;
      switch (componentName) {
        case "PE_Config":
          return PE_Config;
        case "Switch_Config":
          return Switch_Config;
        case "CE_Config":
        default:
          return CE_Config;
      }
    },
  },
  watch: {
    $route() {
      this.updateTitle();
    },
  },
};
</script>

<style scoped>
.vrf_container {
  margin: 30px auto;
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
