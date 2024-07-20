<!-- Barcode.vue -->
<template>
  <div ref="barcodeContainer position-relative">
    <svg ref="barcode"></svg>
    <div ref="barcodeText" class="barcode-text mt-0"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import JsBarcode from "jsbarcode";

export default {
  name: "Barcode",
  props: {
    value: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    shapeColor: {
      type: String,
      default: "#000",
    },
    textColor: {
      type: String,
      default: "#000",
    },
  },
  setup(props) {
    const barcode = ref(null);
    const barcodeText = ref(null);
    const barcodeContainer = ref(null);

    const generateBarcode = () => {
      if (barcode.value) {
        JsBarcode(barcode.value, props.value, {
          ...props.options,
          displayValue: false, // Disable text display
          lineColor: props.shapeColor,
        });

        // Add the text separately with the desired color
        barcodeText.value.innerText = props.value;
        barcodeText.value.style.color = props.textColor;
        barcodeText.value.style.fontWeight = 700;
        barcodeText.value.style.fontSize = `${props.options.fontSize || 18}px`;
        barcodeText.value.style.textAlign = "center";
      }
    };

    onMounted(generateBarcode);
    watch(() => props.value, generateBarcode);
    watch(() => props.options, generateBarcode, { deep: true });
    watch(() => props.shapeColor, generateBarcode);
    watch(() => props.textColor, generateBarcode);

    return {
      barcode,
      barcodeText,
      barcodeContainer,
    };
  },
};
</script>

<style>
.barcode-text {
  position: absolute;
  left: 50%;
  bottom: 1px;
  transform: translateX(-50%);
  font-size: 10px !important;
}

@media print {
  .barcode-text {
    font-size: 6px !important;
    bottom: 7px;
  }
}

.barcode_generator {
  z-index: -1;
}
</style>
