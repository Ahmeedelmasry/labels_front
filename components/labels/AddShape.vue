<template>
  <div class="add_shape w-100">
    <div class="label_shape">
      <div class="body">
        <div class="types">
          <div class="cont">
            <div class="shapes">
              <div class="single_shape">
                <img  src="/upper.webp" alt="" />
              </div>
              <div class="single_shape">
                <img  src="/middle.webp" alt="" />
              </div>
              <div class="single_shape">
                <img  src="/last.webp" alt="" />
              </div>
            </div>
            <div class="types">
              <div class="single_shape">
                <img 
                  :src="`/symbole_${item}.webp`"
                  alt=""
                  v-for="item in firstRow"
                  :key="item"
                  class="me-3"
                />
              </div>
              <div class="single_shape">
                <img 
                  :src="`/symbole_${item}.webp`"
                  alt=""
                  v-for="item in middleRow"
                  :key="item"
                  class="me-3"
                />
              </div>
              <div class="single_shape">
                <img 
                  :src="`/symbole_${item}.webp`"
                  alt=""
                  v-for="item in lastRow"
                  :key="item"
                  class="me-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["firstRow", "middleRow", "lastRow"]);
</script>

<style lang="scss" scoped>
.add_shape {
  .label_shape {
    width: 400px;
    height: 360px;
    border: 5px solid black;
    .header {
      min-height: 40px;
      border-bottom: 3px solid black;
      text-transform: uppercase;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 35px;
      color: #1d83d7;
    }
    .body {
      // height: calc(100% - 55px);
      height: 100%;
      display: flex;
      .types {
        // width: calc((100% / 3) * 2);
        width: 100%;
        .cont {
          height: 100%;
          display: flex;
          .shapes {
            // width: 70%;
            border-right: 3px solid black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .single_shape {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              padding: 0 15px;
              &:nth-of-type(even) {
                border-top: 3px solid black;
                border-bottom: 3px solid black;
              }
              img {
                width: 130px;
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
                border-top: 3px solid black;
                border-bottom: 3px solid black;
              }
              img {
                width: 75px;
              }
            }
          }
        }
        .footer {
          font-size: 28px;
          color: indianred;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          height: 30px;
          border-top: 3px solid black;
        }
      }
      .barcode {
        width: calc(100% / 3);
        border-left: 3px solid black;
        height: 100%;
        .parent {
          height: calc(100% - 52px);
          display: flex;
          align-items: center;
          justify-content: center;
          .barcoe_shap {
            width: 85%;
            border: 2px solid black;
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
          padding: 0 5px;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
