import { defineStore } from "pinia";
import axios from "@/plugins/axios_instance.js";
import { useCookie } from "nuxt/app";

export const mainStore = defineStore("mainStore", {
  state: () => ({
    apiURL: `http://localhost:3000`,
    // apiURL: `https://api.samaalmutewkl.com`,
    callSuccess: false,
    callMsg: "",
    callColor: 0,
    globalAlertType: "",
    globalAlertTitle: "",
    globalAlertText: "",
    btn_text: "Cancel",
    globalAlert: false,
    toDel: null,
    regetData: false,
  }),
  actions: {
    handleErr(type, title, text, toDel) {
      this.globalAlertType = type;
      this.globalAlertTitle = title;
      this.globalAlertText = text;
      this.toDel = toDel;
      this.globalAlert = true;
    },
    callResponse(responseType, msg, color) {
      this.callSuccess = responseType;
      this.callMsg = msg;
      this.callColor = color;
    },
    resetSnackbar() {
      this.callSuccess = false;
      this.callMsg = "";
    },
    async doDeleteItem() {
      let result;
      await axios()
        .delete(`${this.apiURL}/${this.toDel.url}/${this.toDel._id}`, {
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          result = true;
          this.callResponse(true, res.data.message, 1);
        })
        .catch((err) => {
          result = false;
          this.callResponse(true, err.response.data.message, 2);
        });
      return result;
    },
    async doDeleteItem() {
      let result;
      await axios()
        .delete(`${this.apiURL}/${this.toDel.url}/${this.toDel._id || ""}`, {
          params: { reference: this.toDel.ref || "" },
          headers: {
            Authorization: `${useCookie("logger").value}`,
          },
        })
        .then((res) => {
          result = true;
          this.callResponse(
            true,
            this.toDel.reference
              ? "Factory deleted successfully"
              : res.data.message,
            1
          );
        })
        .catch((err) => {
          result = false;
          this.callResponse(true, err.response.data.message, 2);
        });
      return result;
    },
  },
});
