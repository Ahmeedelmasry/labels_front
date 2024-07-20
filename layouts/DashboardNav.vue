<template>
  <div class="res_nav">
    <AppSideDrawer :currentWidth="props.currentWidth" />
    <v-app-bar elevation="5">
      <v-container fluid>
        <v-row class="align-center">
          <v-col cols="3" class="d-flex align-center">
            <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="6" class="text-center img_container text-end">
            <!-- <v-icon size="30" class="me-4 ms-2" @click="openSafe = true"
              >mdi-safe</v-icon
            > -->
            <v-avatar
              id="profile_menu_activator_responsive"
              style="cursor: pointer"
            >
              <v-icon color="black" size="35">mdi-account-circle</v-icon>
            </v-avatar>
            <v-menu
              activator="#profile_menu_activator_responsive"
              transition="slide-y-transition"
              location="bottom right"
              offset="12"
              class="profile_menu text-start"
              width="200"
            >
              <v-list
                base-color="green"
                style="box-shadow: 0 0 20px 0 rgba(62, 28, 131, 0.1)"
                id="profile_menu"
              >
                <v-list-item class="top_bar">
                  <v-list-item-title>
                    Hello, {{ loggerData.userName.split(" ")[0] }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item :to="{ name: 'profile' }">
                  <v-list-item-title>
                    <v-icon class="me-2"
                      >mdi-card-account-details-outline</v-icon
                    >
                    Profile
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>
                    <v-icon class="me-2">mdi-logout-variant</v-icon>
                    Log Out
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <Safe
      v-if="openSafe"
      :openPopup="openSafe"
      @closePopup="openSafe = false"
    />
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import AppSideDrawer from "./AppSideDrawer.vue";

// Init Store
const authModule = authStore();

// Props
const props = defineProps(["currentWidth"]);

// Init Router
const router = useRouter();

// Data
const { loggerData, token } = storeToRefs(authModule);

const openSafe = ref(false);

// Event bus
const { $event } = useNuxtApp();

// Methods
const openDrawer = () => {
  $event("openDashboardDrawer");
};

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
</script>

<style lang="scss">
#profile_menu {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  .v-list-item {
    .v-list-item-title {
      font-size: 13px !important;
      color: rgba(0, 0, 0, 0.718);
    }
    &:not(:last-child) {
      border-bottom: 1px solid rgba(138, 138, 138, 0.218);
    }
  }
}
</style>
