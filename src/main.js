import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);
app.use(bootstrap);
app.use(pinia);

app.use(router);

app.mount("#app");
