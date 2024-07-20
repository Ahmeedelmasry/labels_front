<template>
  <div class="add_label">
    <v-dialog v-model="dialog" persistent fullscreen>
      <v-card style="border-radius: unset !important">
        <v-card-actions class="justify-center">
          <v-btn color="blue" variant="outlined" v-print="printObj">
            <v-icon>mdi-printer</v-icon>
            Print</v-btn
          >
          <v-btn @click="dialog = false" color="red" variant="outlined">
            <v-icon>mdi-close</v-icon>

            Close</v-btn
          >
        </v-card-actions>

        <v-container id="printable_view">
          <v-row v-if="items?.length">
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              class="listing_col mb-2 prentable_parent"
              v-for="item in items"
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
                  />
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const dialog = ref(false);
const printObj = ref({
  id: "printable_view",
  popTitle: " -",
  extraCss:
    "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
  extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
});

const emits = defineEmits(["close_popup"]);
const props = defineProps(["openPopup", "items"]);

watch(
  () => dialog.value,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        emits("close_popup");
      }, 200);
    }
  }
);
// Hooks
onMounted(() => {
  dialog.value = props.openPopup;
  console.log(props.items);
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
