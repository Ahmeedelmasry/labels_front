<template>
  <div class="dashboard_tests_page mb-10">
    <LabelsListing
      :labels="labels"
      :loading="loading"
      @regetItems="getData($event)"
    />
  </div>
</template>

<script setup>
import { labelStore } from "@/stores/labels";
import { storeToRefs } from "pinia";

// Init STores
const labelsModule = labelStore();

// Store Data
const { labels } = storeToRefs(labelsModule);

// Local Data
const loading = ref(true);

// Methods
const getData = async (params = {}) => {
  loading.value = true;
  await labelsModule.doGetLabels(params);
  loading.value = false;
};

// Hooks
onMounted(() => {
  getData(1, 10);
});
</script>
