<template>
  <div class="menu_drawer_dashboard">
    <v-navigation-drawer
      v-model="drawer"
      elevation="1"
      :touchless="true"
      :width="320"
      class="pt-0 cart-drawer"
      location="left"
      theme="dark"
      id="app_drawer"
    >
      <v-card class="px-0" elevation="0">
        <v-card-title
          class="d-flex justify-space-between w-100 pl-4 pl-2"
          style="font-size: 20px; font-weight: bold"
        >
          <div class="lang_switch d-flex align-center pt-2" style="gap: 15px">
            <v-avatar size="36px" style="border: 2px solid rgb(109, 109, 109)">
              <v-icon color="blue" icon="mdi-account"></v-icon>
            </v-avatar>
            <p style="font-size: 18px; font-weight: 700">
              {{ loggerData.userName }}
            </p>
          </div>
        </v-card-title>
        <v-divider class="mt-2"></v-divider>
        <v-divider></v-divider>
        <v-list density="compact" nav class="pa-0 mt-5">
          <v-list-item
            style="padding: 10px 12px"
            prepend-icon="mdi-label-multiple-outline"
            title="Factories"
            value="factories"
            :to="{ name: 'factories' }"
          >
          </v-list-item>
          <v-list-item
            style="padding: 10px 12px;margin-top: 20px;"
            prepend-icon="mdi-logout"
            title="Log Out"
            @click="logout"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";

// Init Store
const authModule = authStore();

// Init Router
const router = useRouter();

// Data
const { loggerData } = storeToRefs(authModule);

const drawer = ref(false);
const currentWidth = ref(null);

// Event Bus
const { $listen } = useNuxtApp();

// Props
const props = defineProps(["currentWidth"]);

// Watchers
watch(
  () => props.currentWidth,
  (newVal) => {
    if (newVal < 1200) {
      drawer.value = false;
    } else {
      drawer.value = true;
    }
  }
);

// Methods

const logout = () => {
  useCookie("logger").value = undefined;
  setTimeout(() => {
    router.push({ name: "signin" });
    setTimeout(() => {
      loggerData.value = {};
      token.value = null;
    }, 200);
  }, 100);
};

// Hooks
onMounted(() => {
  $listen("openDashboardDrawer", () => {
    drawer.value = !drawer.value;
  });
  window.onresize = () => {
    currentWidth.value = window.innerWidth;
  };
  currentWidth.value = window.innerWidth;
  props.currentWidth < 1200 ? (drawer.value = false) : (drawer.value = true);
});
</script>

<style lang="scss">
.menu_drawer_dashboard {
  .v-list-item--nav {
    .v-list-item-title {
      font-size: 14px;
      line-height: unset;
      font-weight: bold;
      letter-spacing: 1px;
      color: rgb(156, 156, 156);
    }

    &.v-list-item--active {
      color: rgb(231, 231, 231) !important;
      .v-list-item-title {
        color: rgb(231, 231, 231) !important;
      }
      i {
        color: white !important;
      }
    }
  }
  i {
    color: rgb(187, 186, 186) !important;
  }
  ul {
    padding-right: 0;
    padding-right: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 7px !important;
  }
  ::-webkit-scrollbar-track {
    width: 7px !important;
    background-color: rgb(242, 242, 242);
  }
  ::-webkit-scrollbar-thumb {
    width: 10px !important;
    background-color: rgb(209, 209, 209);
  }
  a {
    color: rgb(41, 41, 41);
    width: 100%;
    padding: 10px 20px;
    font-size: 18px;
  }
}
// Media Queries
@media (max-width: 580px) {
  .nav-link {
    font-size: 12px;
  }
}
</style>
