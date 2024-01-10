<script setup>
import { getGoodsList } from "@/apis/goods";
import { onMounted, ref } from "vue";
import GoodsItem from "@/views/Home/components/GoodsItem.vue";

const tabTypes = [
  { name: "all", label: "发布商品" },
  { name: "unsold", label: "待出售" },
  { name: "sold", label: "已出售" },
];

const goodsList = ref([]);
const total = ref(0);
const params = ref({
  pageNum: 1,
  pageSize: 6,
  soldState: 0,
});
const getGoods = async () => {
  const res = await getGoodsList(params.value);
  goodsList.value = res.data.rows;
  total.value = Number(res.data.totalNum);
};

onMounted(() => getGoods());

const tabChange = (type) => {
  params.value.soldState = Number(type);
  getGoods();
};
const pageChange = (page) => {
  params.value.pageNum = page;
  getGoods();
};
</script>

<template>
  <div class="goods-container">
    <el-tabs @tab-change="tabChange">
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
      />

      <div class="main-container">
        <div class="holder-container" v-if="goodsList.length === 0">
          <el-empty description="暂无商品数据" />
        </div>
        <div v-else>
          <div class="home-product">
            <div class="box">
              <ul class="goods-list">
                <li v-for="goods in goodsList" :key="goods.gId">
                  <GoodsItem :goods="goods" />
                </li>
              </ul>
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              :total="total"
              :page-size="params.pageSize"
              @current-change="pageChange"
              background
              layout="prev, pager, next"
            />
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.goods-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;
    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
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
  }
}
</style>
