<template>
  <div class="dashboard_tests_page mb-10">
    <LabelsListReferences
      :labelsReferences="labelsReferences"
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
const { labelsReferences } = storeToRefs(labelsModule);

// Local Data
const loading = ref(true);

// Methods
const getData = async (e) => {
  loading.value = true;
  await labelsModule.doGetLabelsReferences(e);
  loading.value = false;
};

// Hooks
onMounted(() => {
  getData(1, 10);
});
</script>
