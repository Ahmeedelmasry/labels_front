<template>
  <div class="dashboard_banners_listing">
    <div
      class="d-flex justify-space-between align-center px-5 mt-10 py-5 bg-white mx-5"
    >
      <h2 class="main_title">Factories</h2>
      <div class="d-flex align-center">
        <div class="position-relative search_table_parent">
          <form
            action=""
            @submit.prevent="
              emits('regetItems', {
                searchWord: searchWord,
              })
            "
          >
            <input
              type="text"
              class="search_input me-3"
              placeholder="Search..."
              v-model="searchWord"
            />
            <v-icon v-if="!searchWord">mdi-magnify</v-icon>
            <v-icon
              size="18"
              v-else
              @click="
                (searchWord = null),
                  emits('regetItems', {
                    searchWord: searchWord,
                  })
              "
              >mdi-close</v-icon
            >
          </form>
        </div>
        <v-btn
          color="grey-darken-4"
          style="text-transform: unset; font-weight: 700"
          elevation="0"
          @click="openAdd = true"
          height="45"
          rounded="lg"
        >
          <v-icon>mdi-plus</v-icon>
          Add Label</v-btn
        >
      </div>
    </div>
    <v-container
      fluid
      class="page_container bg-white"
      style="min-height: 65dvh"
    >
      <v-row class="px-4">
        <v-col
          cols="12"
          class="section_container dashboard_table pa-0"
          id="printable"
        >
          <!-- <h1 class="my-2 hide_till_print">Labels</h1> -->

          <v-row v-if="labelsReferences.length && !loading">
            <v-col
              cols="3"
              class="listing_col prentable_parent pa-5"
              v-for="(item, i) in labelsReferences"
              :key="item._id"
            >
              <v-card
                elevation="10"
                rounded="lg"
                class="text-center py-5"
                style="position: relative; z-index: 10"
              >
                <v-icon
                  size="70"
                  color="grey-darken-3"
                  @click="
                    $router.push({
                      name: 'labels',
                      query: { id: item },
                    })
                  "
                  >mdi-file</v-icon
                >
                <v-card-text class="pt-2">{{ item }}</v-card-text>
                <v-btn
                  color="red"
                  style="
                    position: relative;
                    z-index: 100000;
                    text-transform: unset;
                  "
                  size="small"
                  @click="openDel(item)"
                  variant="outlined"
                  class="mt-3"
                >
                  <v-icon class="me-2">mdi-delete</v-icon>
                  Delete
                </v-btn>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="!labelsReferences.length && !loading" class="no_data">
            No Data Available
          </div>

          <div
            class="d-flex align-center justify-center"
            style="line-height: 330px"
            v-if="loading"
          >
            <div>
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <labels-add
      :openPopup="openAdd"
      @closePopup="openAdd = false"
      v-if="openAdd"
      @regetData="
        (searchWord = null),
          emits('regetItems', {
            searchWord: searchWord,
          })
      "
      @viewData="openViewLabels($event)"
    />

    <labels-view-labels
      :openPopup="openView"
      @close_popup="(openView = false), (labelsToView = [])"
      v-if="openView"
      :items="labelsToView"
    />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/stores";

// Init Store
const mainModule = mainStore();

const { regetData } = storeToRefs(mainModule);

// Local Data
const openAdd = ref(false);
const openView = ref(false);
const searchWord = ref(null);
const labelsToView = ref([]);
const toDelete = ref(null);

// Props
const props = defineProps(["labelsReferences", "loading"]);

// Emits
const emits = defineEmits(["regetItems"]);

// Methods
const openDel = (item) => {
  mainModule.handleErr(
    "alert",
    "Delete Label",
    `Are you sure you want to delete this factory (${item})?`,
    { ref: item, url: "labels/references" }
  );
  toDelete.value = item.selectable;
};

watch(
  () => regetData.value,
  (newVal) => {
    if (newVal) {
      emits("regetItems", {
        searchWord: searchWord.value,
      });
    }
  }
);

const openViewLabels = (items) => {
  labelsToView.value = items;
  openView.value = true;
};
</script>

<style lang="scss">
// @media print {
//   .listing_col {
//     max-width: calc(100% / 6) !important;
//   }
// }
.no_data {
  height: 58dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #0000006e;
  font-weight: bold;
}
</style>
