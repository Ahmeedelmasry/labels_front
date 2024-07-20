<template>
  <div class="add_label">
    <v-dialog v-model="dialog" persistent fullscreen>
      <v-card style="border-radius: unset !important">
        <v-card-title
          class="mb-0 text-center bg-grey-lighten-3 main_title font-safe-bold"
          style="font-size: 22px"
        >
          {{ toUpdate ? "Update Label" : "Add Label" }}
        </v-card-title>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-form class="pa-5" @submit.prevent="submitData">
          <v-container class="add_label px-16">
            <v-row>
              <v-col cols="5">
                <LabelsAddShape
                  :firstRow="formData.firstRow"
                  :middleRow="formData.middleRow"
                  :lastRow="formData.lastRow"
                />
              </v-col>
              <v-col cols="7">
                <v-row>
                  <v-col cols="12">
                    <div class="field_container">
                      <div class="input_parent position-relative">
                        <v-autocomplete
                          :items="firstRowList"
                          rounded="lg"
                          multiple
                          v-model="formData.firstRow"
                          label="Upper"
                          variant="outlined"
                          chips
                          :error="v$.firstRow.$errors.length"
                          :error-messages="
                            v$.firstRow.$errors.length
                              ? v$.firstRow.$errors[0].$message
                              : ''
                          "
                          closable-chips
                          prependInnerIcon="mdi-label-multiple-outline"
                        >
                          <template #prepend-item>
                            <div
                              class="d-flex justify-start ps-8 pb-3"
                              style="gap: 10px"
                            >
                              <span
                                v-for="num in 4"
                                :key="num"
                                class="d-flex flex-column align-center justify-center"
                              >
                                <img
                                  :src="`/symbole_${num}.webp`"
                                  width="30"
                                  height="40"
                                  alt=""
                                />
                                <v-spacer></v-spacer>
                                <p style="font-size: 12px">Symbole {{ num }}</p>
                              </span>
                            </div>
                            <v-divider></v-divider> </template
                        ></v-autocomplete>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="field_container">
                      <div class="input_parent position-relative">
                        <v-autocomplete
                          :items="secondRowList"
                          rounded="lg"
                          multiple
                          v-model="formData.middleRow"
                          :error="v$.middleRow.$errors.length"
                          :error-messages="
                            v$.middleRow.$errors.length
                              ? v$.middleRow.$errors[0].$message
                              : ''
                          "
                          label="Middle"
                          variant="outlined"
                          chips
                          closable-chips
                          prependInnerIcon="mdi-label-multiple-outline"
                        >
                          <template #prepend-item>
                            <div
                              class="d-flex justify-start ps-8 pb-3"
                              style="gap: 10px"
                            >
                              <span
                                v-for="num in 4"
                                :key="num"
                                class="d-flex flex-column align-center justify-center"
                              >
                                <img
                                  :src="`/symbole_${num}.webp`"
                                  width="30"
                                  height="40"
                                  alt=""
                                />
                                <v-spacer></v-spacer>
                                <p style="font-size: 12px">Symbole {{ num }}</p>
                              </span>
                            </div>
                            <v-divider></v-divider> </template
                        ></v-autocomplete>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="field_container">
                      <div class="input_parent position-relative">
                        <v-autocomplete
                          :items="lastRowList"
                          rounded="lg"
                          multiple
                          v-model="formData.lastRow"
                          :error="v$.lastRow.$errors.length"
                          :error-messages="
                            v$.lastRow.$errors.length
                              ? v$.lastRow.$errors[0].$message
                              : ''
                          "
                          label="Last"
                          variant="outlined"
                          chips
                          closable-chips
                          prependInnerIcon="mdi-label-multiple-outline"
                        >
                          <template #prepend-item>
                            <div
                              class="d-flex justify-start ps-8 pb-3"
                              style="gap: 10px"
                            >
                              <span
                                v-for="num in 4"
                                :key="num"
                                class="d-flex flex-column align-center justify-center"
                              >
                                <img
                                  :src="`/symbole_${num}.webp`"
                                  width="30"
                                  height="40"
                                  alt=""
                                />
                                <v-spacer></v-spacer>
                                <p style="font-size: 12px">Symbole {{ num }}</p>
                              </span>
                            </div>
                            <v-divider></v-divider> </template
                        ></v-autocomplete>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="field_container">
                      <div class="input_parent position-relative">
                        <v-text-field
                          rounded="lg"
                          v-model="formData.artNo"
                          label="Art No"
                          variant="outlined"
                          prependInnerIcon="mdi-counter"
                          :error="v$.artNo.$errors.length"
                          :error-messages="
                            v$.artNo.$errors.length
                              ? v$.artNo.$errors[0].$message
                              : ''
                          "
                        >
                        </v-text-field>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="field_container">
                      <div class="input_parent position-relative">
                        <v-text-field
                          rounded="lg"
                          v-model="formData.barcode"
                          label="Barcode"
                          variant="outlined"
                          prependInnerIcon="mdi-counter"
                          :error="v$.barcode.$errors.length"
                          :error-messages="
                            v$.barcode.$errors.length
                              ? v$.barcode.$errors[0].$message
                              : ''
                          "
                        >
                        </v-text-field>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <div class="actions text-center mt-5">
            <v-btn
              color="red"
              class="me-3"
              width="150"
              @click="dialog = false"
              :disabled="btnLoading"
              rounded="lg"
              height="45"
              elevation="0"
              >Cancel</v-btn
            >
            <v-btn
              color="blue"
              type="submit"
              :loading="btnLoading"
              width="150"
              rounded="lg"
              elevation="0"
              height="45"
              >Save</v-btn
            >
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { authStore } from "@/stores/auth/auth";
import { storeToRefs } from "pinia";
import { labelStore } from "@/stores/labels";

// Init Stores
const authModule = authStore();
const labelsModule = labelStore();
const { loggerData } = storeToRefs(authModule);

// Local Data
const formData = ref({
  firstRow: [],
  middleRow: [],
  lastRow: [],
  labels: [],
  artNo: null,
  barcode: null,
});

const dataRoles = computed(() => {
  return {
    firstRow: { required },
    middleRow: { required },
    lastRow: { required },
    artNo: { required },
    barcode: { required },
  };
});

const labelsList = ref([
  {
    title: "Symbole 1",
    value: 1,
  },
  {
    title: "Symbole 2",
    value: 2,
  },
  {
    title: "Symbole 3",
    value: 3,
  },
  {
    title: "Symbole 4",
    value: 4,
  },
]);

const dialog = ref(false);
const btnLoading = ref(false);

const firstRowList = computed(() => {
  if (formData.value.firstRow.length < 2) {
    return labelsList.value;
  }

  return labelsList.value.filter((item) =>
    formData.value.firstRow.includes(item.value)
  );
});

const secondRowList = computed(() => {
  if (formData.value.middleRow.length < 2) {
    return labelsList.value;
  }

  return labelsList.value.filter((item) =>
    formData.value.middleRow.includes(item.value)
  );
});

const lastRowList = computed(() => {
  if (formData.value.lastRow.length < 2) {
    return labelsList.value;
  }

  return labelsList.value.filter((item) =>
    formData.value.lastRow.includes(item.value)
  );
});

// Props
const props = defineProps(["openPopup", "toUpdate"]);

// emits
const emits = defineEmits(["closePopup", "regetData"]);

// Watchers
watch(
  () => dialog.value,
  (newval) => {
    if (!newval) {
      setTimeout(() => {
        emits("closePopup");
      }, 200);
    }
  }
);

// Methods
const v$ = useVuelidate(dataRoles, formData);

const submitData = async () => {
  const res = await v$.value.$validate();
  if (res) {
    const res = await labelsModule.doUpdateLabel(
      formData.value,
      props.toUpdate._id
    );
    if (res) {
      emits("regetData");
      dialog.value = false;
    }
  }
};

// Hooks
onMounted(() => {
  dialog.value = props.openPopup;
  if (props.toUpdate) {
    formData.value.firstRow = props.toUpdate.firstRow;
    formData.value.middleRow = props.toUpdate.middleRow;
    formData.value.lastRow = props.toUpdate.lastRow;
    formData.value.artNo = props.toUpdate.artNo;
    formData.value.barcode = props.toUpdate.barcode;
  }
});
</script>

<style lang="scss">
.add_label {
  .table_field {
    padding: 7px;
    border-radius: 5px;
    outline: none;
    border: 1px solid transparent;
    width: 150px;
    &.err {
      outline: none;
      border: 1px solid indianred;
    }
  }
}
</style>
