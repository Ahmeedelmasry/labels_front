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

// Init Router
const route = useRoute();

// Store Data
const { labels } = storeToRefs(labelsModule);

// Local Data
const loading = ref(true);
const reference = ref(null);

// Methods
const getData = async (params = {}) => {
  loading.value = true;
  if (route.query.id) {
    reference.value = route.query.id;
  }
  await labelsModule.doGetLabels({
    ...params,
    reference: reference.value,
  });
  loading.value = false;
};

// Hooks
onMounted(() => {
  getData(1, 10);
});
</script>
