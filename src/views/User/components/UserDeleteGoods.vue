<script setup>
import { getGoodsList, deleteGoodsAPI } from "@/apis/goods";
// import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useGoodsStore } from "@/stores/goods";
import { useRouter } from "vue-router";

import { onMounted, ref } from "vue";
const goodsStore = useGoodsStore();
const router = useRouter();

// tab列表
const tabTypes = [{ name: "all", label: "全部待售商品" }];
// 订单列表
const goodsList = ref([]);
const total = ref(0);
const params = ref({
  pageNum: 1,
  pageSize: 3,
  soldState: 0,
});
const getGoods = async () => {
  const res = await getGoodsList(params.value);
  goodsList.value = res.data.rows;
  total.value = Number(res.data.totalNum);
};
// const router = useRouter();
onMounted(() => getGoods());

const pageChange = (page) => {
  params.value.pageNum = page;
  getGoods();
};
const deleteGoods = async (gId) => {
  await deleteGoodsAPI(gId);
  ElMessage({ type: "success", message: "商品下架成功" });
  // router.push({ path: "/user/deleteGoods" });
  location.reload();
};
const editGood = (goods) => {
  goodsStore.goods = goods;
  router.replace('editGoods')
};
</script>

<template>
  <div class="goods-container">
    <el-tabs>
      <!-- tab切换 -->
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
          <div class="goods-item" v-for="goods in goodsList" :key="goods.id">
            <div class="head">
              <span>上传时间：{{ goods.createTime }}</span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li>
                    <a class="image" href="javascript:;">
                      <img :src="goods.thumbnail" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ goods.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>{{ goods.title }}</span>
                      </p>
                    </div>
                    <div class="column state">
                      {{ goods.state == 0 ? "审核通过" : "审核中" }}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="column amount">
                <p class="red">¥{{ goods.prize }}</p>
              </div>
              <div class="column amount">
                <el-button size="large" @click="editGood(goods)"
                  >编辑商品信息</el-button
                >
              </div>
              <div class="column amount">
                <el-popconfirm
                  title="确认下架商品吗?"
                  @confirm="deleteGoods(goods.gId)"
                >
                  <template #reference>
                    <el-button type="danger" size="large">下架商品</el-button>
                  </template>
                </el-popconfirm>
              </div>
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
  }
}

.goods-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;
        color: $xtxColor;
        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>
