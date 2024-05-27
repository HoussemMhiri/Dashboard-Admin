import { defineStore } from "pinia";

export const useAppStore = defineStore({
  id: "app",
  state: () => ({
    username: localStorage.getItem("username") || "",
  }),
  actions: {
    setUsername(username) {
      this.username = username;
      localStorage.setItem("username", username);
    },
  },
});
