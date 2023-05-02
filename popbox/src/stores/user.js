import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return { user: {} };
  },

  actions: {
    setUser(payload) {
      this.user = payload;
    },

    logout() {
      this.user = {};
      localStorage.removeItem("user");
    },
  },
});
