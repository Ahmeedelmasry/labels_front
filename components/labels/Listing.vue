<template>
  <div class="dashboard_banners_listing">
    <div
      class="d-flex justify-space-between align-center px-5 mt-10 py-5 bg-white mx-5"
    >
      <h2 class="main_title">
        <span>{{ $route.query.id }}</span>
        <v-icon>mdi-chevron-right</v-icon>
        Labels
      </h2>
      <div class="d-flex align-center">
        <div v-print="printObj">
          <v-icon
            size="30"
            class="me-3"
            color="grey-darken-4"
            style="cursor: pointer"
            >mdi-printer</v-icon
          >
        </div>
        <div class="position-relative search_table_parent">
          <form
            action=""
            @submit.prevent="
              emits('regetItems', {
                page: 1,
                limit: perPage,
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
                    page: 1,
                    limit: perPage,
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
    <v-container fluid class="page_container bg-white">
      <v-row v-if="labels" class="px-4">
        <v-col
          cols="12"
          class="section_container dashboard_table pa-0"
          id="printable"
        >
          <!-- <h1 class="my-2 hide_till_print">Labels</h1> -->

          <v-row v-if="labels.docs && !loading">
            <v-col
              cols="3"
              class="listing_col mb-2 prentable_parent"
              v-for="(item, i) in labels.docs"
              :key="item._id"
            >
              <v-card flat class="">
                <div class="d-flex align-center justify-center flex-column">
                  <LabelsPrintShape
                    :firstRow="item.firstRow"
                    :middleRow="item.middleRow"
                    :lastRow="item.lastRow"
                    :artNumber="item.artNo"
                    :barcode="item.barcode"
                    :id="singlePrintObj[i].id"
                  />
                  <v-card-actions class="justify-center hide_on_print">
                    <v-btn
                      color="green"
                      size="small"
                      v-print="singlePrintObj[i]"
                      variant="outlined"
                      style="text-transform: unset"
                    >
                      <v-icon>mdi-printer</v-icon>
                    </v-btn>
                    <v-btn
                      variant="outlined"
                      color="blue"
                      size="small"
                      style="text-transform: unset"
                      @click="(toUpdate = item), (openUpdate = true)"
                    >
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      size="small"
                      @click="openDel(item)"
                      variant="outlined"
                      style="text-transform: unset"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <div v-if="!labels.docs?.length && !loading" class="no_data">
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

          <v-row class="align-center hide_on_print mt-1">
            <v-col cols="3">
              <div class="ps-5 d-flex align-center">
                <v-autocomplete
                  v-model="perPage"
                  :items="[10, 50, 100, 500]"
                  variant="text"
                  hide-details
                  flat
                ></v-autocomplete>
                <label
                  for=""
                  class="mb-2 d-block text-end ms-3 mt-3"
                  style="font-size: 12px"
                  >Items Per Page</label
                >
              </div>
            </v-col>
            <v-col cols="9" class="text-end">
              <v-pagination
                @update:model-value="
                  (page = $event),
                    emits('regetItems', {
                      page,
                      limit: perPage,
                      searchWord: searchWord,
                    })
                "
                rounded="xl"
                size="40"
                color="black"
                :length="labels.totalPages"
              ></v-pagination
            ></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <labels-update
      :openPopup="openUpdate"
      @closePopup="(openUpdate = false), (toUpdate = null)"
      :toUpdate="toUpdate"
      v-if="openUpdate"
      @regetData="
        (page = 1),
          (searchWord = null),
          emits('regetItems', {
            page: page,
            limit: perPage,
            searchWord: searchWord,
          })
      "
    />

    <labels-add
      :openPopup="openAdd"
      @closePopup="openAdd = false"
      v-if="openAdd"
      @regetData="
        (page = 1),
          (searchWord = null),
          emits('regetItems', {
            page: page,
            limit: perPage,
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
const openUpdate = ref(false);
const openView = ref(false);
const toUpdate = ref(null);
const searchWord = ref(null);
const labelsToView = ref([]);
const toDelete = ref(null);
const page = ref(1);
const perPage = ref(10);

// Print
const printObj = ref({
  id: "printable",
  popTitle: " -",
  extraCss:
    "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
});

const singlePrintObj = ref([]);

// Props
const props = defineProps(["labels", "loading"]);

// Emits
const emits = defineEmits(["regetItems"]);

// Watchers
watch(
  () => perPage.value,
  (newVal) => {
    emits("regetItems", {
      page: page.value,
      limit: newVal,
      searchWord: searchWord.value,
    });
  }
);

watch(
  () => regetData.value,
  (newVal) => {
    if (newVal) {
      emits("regetItems", {
        page: 1,
        limit: perPage.value,
        searchWord: searchWord.value,
      });
    }
  }
);

// Methods
const openDel = (item) => {
  mainModule.handleErr(
    "alert",
    "Delete Label",
    `Are you sure you want to delete this label (Art No: ${item.artNo})?`,
    { ...item, url: "labels" }
  );
  toDelete.value = item.selectable;
};

const openViewLabels = (items) => {
  labelsToView.value = items;
  openView.value = true;
};

const setSingleItemPrint = () => {
  props.labels.docs.forEach((el, i) => {
    singlePrintObj.value.push({
      id: `el_${i}`,
      popTitle: " -",
      extraCss:
        "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
      extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
    });
  });
};

watch(
  () => props.labels,
  () => {
    setSingleItemPrint();
  },
  { deep: true }
);
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
