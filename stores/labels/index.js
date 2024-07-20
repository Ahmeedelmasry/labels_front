import { defineStore } from "pinia";
import axios from "@/plugins/axios_instance.js";
import { mainStore } from "@/stores";

export const labelStore = defineStore("labelStore", {
  state: () => ({
    labels: {},
    labelsReferences: [],
  }),
  actions: {
    async doGetLabels(params) {
      await axios()
        .get(`${mainStore().apiURL}/labels`, {
          params: { ...params },
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          this.labels = res.data;
        });
    },
    async doGetLabelsReferences(params) {
      await axios()
        .get(`${mainStore().apiURL}/labels/references`, {
          params: { ...params },
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          this.labelsReferences = res.data;
        });
    },
    async doAddLabel(data) {
      let result;
      await axios()
        .post(`${mainStore().apiURL}/labels`, data, {
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          result = res.data.data;
          mainStore().callResponse(true, res.data.message, 1);
        })
        .catch((err) => {
          result = false;
          mainStore().callResponse(true, err.response.data.message, 2);
        });
      return result;
    },
    async doUpdateLabel(data, id) {
      let result;
      await axios()({
        data: data,
        method: "PUT",
        url: `${mainStore().apiURL}/labels/${id}`,
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
