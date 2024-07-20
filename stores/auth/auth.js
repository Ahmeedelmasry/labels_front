import { defineStore } from "pinia";
import axios from "@/plugins/axios_instance.js";
import { mainStore } from "@/stores";
import { jwtDecode } from "jwt-decode";

export const authStore = defineStore("authStore", {
  state: () => ({
    loggerData: {},
    token: null,
    selected_granary: null,
  }),
  actions: {
    decodeToken(token) {
      const decoded = jwtDecode(token);
      this.loggerData = decoded.data;
      this.token = token;
    },
    async doLogin(data) {
      let result;
      await axios()
        .post(`${mainStore().apiURL}/auth/login`, data)
        .then(async (res) => {
          result = true;
          this.decodeToken(res.data.token);
        })
        .catch((err) => {
          if (err.code == "ERR_NETWORK") {
            mainStore().callResponse(true, "Faild to connect server", 2);
          } else {
            mainStore().callResponse(
              true,
              err.response?.data?.message || "Something Went Wrong",
              2
            );
          }
          result = false;
        });
      return result;
    },
  },
});
