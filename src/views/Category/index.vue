<script setup>
import { getGoodsAPI } from "@/apis/goods";
import { ref, onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import GoodsItem from "@/views/Home/components/GoodsItem.vue";
const goodsList = ref([]);
// const params = {
//   pageNum: 1,
//   pageSize: 200,
// };
const route = useRoute();
const getGoods = async (id = route.params.id) => {
  const res = await getGoodsAPI(id);
  goodsList.value = res.data;
};
onMounted(() => {
  getGoods();
});

onBeforeRouteUpdate((to) => {
  getGoods(to.params.id);
})
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
