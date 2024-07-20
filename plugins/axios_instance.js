import axios from "axios";
// import { authStore } from "@/stores/auth/auth.js";
import { mainStore } from "@/stores";

export default defineNuxtPlugin(() => {
  const instance = axios.create({});

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response?.status == 401 || error.response?.status == 403) {
        useCookie("logger").value = undefined;
        setTimeout(() => {
          mainStore().callResponse(true, error.response.data.message, 2);
          useRouter().push({ name: "signin" });
        }, 100);
      }
      return Promise.reject(error);
    }
  );

  return instance;
});
