<script setup>
import { getGoodsAPI } from "@/apis/goods";
import { ref, onMounted } from "vue";
import GoodsItem from "./GoodsItem.vue";
const goodsList = ref([]);
const getGoods = async () => {
  const res = await getGoodsAPI();
  goodsList.value = res.data;
};
onMounted(() => {
  console.log(goodsList);
  getGoods();
});
</script>

<template>
  <div class="home-product">
    <div class="box">
      <ul class="goods-list">
        <li v-for="goods in goodsList.rows" :key="goods.id">
          <GoodsItem :goods="goods" />
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.home-product {
  background: #fff;
  margin-top: 20px;
  .box {
    display: flex;
    justify-content: center;
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
