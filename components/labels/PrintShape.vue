<template>
  <div class="print_shape w-100">
    <div class="label_shape">
      <div class="header text-center">art no: {{ artNumber }}</div>
      <div class="body">
        <div class="types">
          <div class="cont">
            <div class="shapes">
              <div class="single_shape">
                <img src="/upper.webp" alt="" />
              </div>
              <div class="single_shape">
                <img src="/middle.webp" alt="" />
              </div>
              <div class="single_shape">
                <img src="/last.webp" alt="" />
              </div>
            </div>
            <div class="types">
              <div
                class="single_shape d-flex align-center justify-center"
                style="gap: 5px"
              >
                <img
                  :src="`/symbole_${item}.webp`"
                  alt=""
                  v-for="item in firstRow"
                  :key="item"
                />
              </div>
              <div
                class="single_shape d-flex align-center justify-center"
                style="gap: 5px"
              >
                <img
                  :src="`/symbole_${item}.webp`"
                  alt=""
                  v-for="item in middleRow"
                  :key="item"
                />
              </div>
              <div
                class="single_shape d-flex align-center justify-center"
                style="gap: 5px"
              >
                <img
                  :src="`/symbole_${item}.webp`"
                  alt=""
                  v-for="item in lastRow"
                  :key="item"
                />
              </div>
            </div>
          </div>
          <div class="footer">
            <span>MADE IN CHINA</span>
          </div>
        </div>
        <div class="barcode">
          <div class="parent">
            <div
              class="barcoe_shap d-flex align-center justify-center pa-0 ps-2"
            >
              <div class="barcode_generator">
                <LabelsBarcode
                  v-if="barcode"
                  :value="barcode"
                  :options="barcodeOptions"
                  shapeColor="#e31e26"
                  textColor="#0780c1"
                />
              </div>
            </div>
          </div>
          <div class="logo">
            <img src="/logo.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "firstRow",
  "middleRow",
  "lastRow",
  "artNumber",
  "barcode",
]);

const barcodeOptions = ref({
  format: "CODE128",
  lineColor: "#e31e26",
  height: 16,
  width: 0.60,
  displayValue: true,
});
</script>

<style lang="scss" scoped>
.print_shape {
  width: 248px !important;
  .label_shape {
    height: 165px;
    border: 2px solid black;
    .header {
      min-height: 20px;
      border-bottom: 1px solid black;
      text-transform: uppercase;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #0780c1;
    }
    .body {
      height: calc(100% - 27px);
      display: flex;
      .types {
        // width: calc((100% / 3) * 2);
        width: 100%;
        .cont {
          height: calc(100% - 24px);
          display: flex;
          .shapes {
            // width: 70%;
            border-right: 1px solid black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .single_shape {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              padding: 0 10px;
              &:nth-of-type(even) {
                border-top: 1px solid black;
                border-bottom: 1px solid black;
              }
              img {
                width: 50px;
              }
            }
          }
          .types {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: space-between;
            .single_shape {
              text-align: center;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              &:nth-of-type(even) {
                border-top: 1px solid black;
                border-bottom: 1px solid black;
              }
              img {
                width: 23px;
              }
            }
          }
        }
        .footer {
          font-size: 15px;
          color: #e31e26;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          border-top: 1px solid black;
        }
      }
      .barcode {
        width: 30%;
        border-left: 1px solid black;
        height: 100%;
        .parent {
          height: calc(100% - 34px);
          display: flex;
          align-items: center;
          justify-content: center;
          .barcoe_shap {
            width: 85%;
            border: 1px solid black;
            margin: auto;
            height: 96%;
            margin-top: 7px;
            padding-top: 20px;
            .barcode_generator {
              transform: rotateZ(90deg);
            }
          }
        }
        .logo {
          padding: 7px 5px 0;
          text-align: center;
          img {
            width: 60px;
          }
        }
      }
    }
  }
}

@media print {
  body {
    margin: 0 !important; /* Reset any body margin */
  }

  .print_shape {
    width: 3.1cm !important;
    .label_shape {
      height: 2.1cm !important;
      overflow: hidden;
      .header {
        min-height: 14px;
        font-size: 8px;
      }
      .body {
        height: calc(100% - 3px);
        .types {
          .cont {
            .shapes {
              .single_shape {
                img {
                  width: 18px;
                }
              }
            }
            .types {
              .single_shape {
                img {
                  width: 9px;
                }
              }
            }
          }
          .footer {
            font-size: 8px;
          }
        }
        .barcode {
          width: 30%;
          border-left: 1px solid black;
          height: 100%;
          .parent {
            height: calc(100% - 32px);
            display: flex;
            align-items: center;
            justify-content: center;
            .barcoe_shap {
              width: 85%;
              border: none;
              margin: auto;
              height: 95%;
              margin-top: 7px;
              padding-right: 14px !important;
              .barcode_generator {
                transform: rotateZ(90deg);
              }
            }
          }
          .logo {
            padding-top: 1px !important;
            img {
              width: 25px;
            }
          }
        }
      }
    }
  }
}
</style>
