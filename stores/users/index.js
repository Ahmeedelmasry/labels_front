import { defineStore } from "pinia";
import axios from "@/plugins/axios_instance.js";
import { mainStore } from "@/stores";

export const userStore = defineStore("userStore", {
  state: () => ({
    users: {},
    clients: {},
  }),
  actions: {
    async doGetUsers(params) {
      await axios()
        .get(`${mainStore().apiURL}/users`, {
          params: { ...params },
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          this.users = res.data;
        });
    },
    async doGetClients(params) {
      await axios()
        .get(`${mainStore().apiURL}/users/clients`, {
          params: { ...params },
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          this.clients = res.data;
        });
    },
    async doAdduser(data) {
      let result;
      await axios()
        .post(`${mainStore().apiURL}/users`, data, {
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          result = true;
          mainStore().callResponse(true, res.data.message, 1);
        })
        .catch((err) => {
          result = false;
          mainStore().callResponse(true, err.response.data.message, 2);
        });
      return result;
    },
    async doUpdateUser(data, id) {
      let result;
      await axios()({
        data: data,
        method: "PUT",
        url: `${mainStore().apiURL}/users/${id}`,
        headers: {
          Authorization: `${useCookie("logger").value}`,
        },
      })
        .then((res) => {
          result = true;
          mainStore().callResponse(true, res.data.message, 1);
        })
        .catch((err) => {
          mainStore().callResponse(true, err.response.data.message, 2);
          result = false;
        });
      return result;
    },
  },
});
