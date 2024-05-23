import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginVue from "../views/LoginVue.vue";
import VRFFrom from "../components/VRF-Form.vue";
import DeviceFrom from "../components/Device-Form.vue";
import NotFoundComponent from "../components/Not-Found.vue";
import forgot_password from "@/views/forgot_password.vue";
import Register from "@/views/Register.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginVue,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: forgot_password,
    },
    {
      path: "/Register",
      name: "register",
      component: Register,
    },
    {
      path: "/vrf/:id",
      name: "VRF_Config",
      component: VRFFrom,
      meta: { requiresAuth: true },
    },
    {
      path: "/device/:id",
      name: "Device_Config",
      component: DeviceFrom,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundComponent,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!user) {
        next("/login");
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
