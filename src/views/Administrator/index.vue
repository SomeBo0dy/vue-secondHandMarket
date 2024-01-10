<script setup>
import { onMounted, ref } from "vue";
import { getunSoldGoodsList, updateGoodsState } from "@/apis/goods";
import { ElMessage } from "element-plus";
// tab列表
const tabTypes = [
  { name: "all", label: "全部商品" },
  { name: "not_approved", label: "已审核商品" },
  { name: "approved", label: "待审核商品" },
];
// 订单列表
const goodsList = ref([]);
const total = ref(0);
const params = ref({
  pageNum: 1,
  pageSize: 3,
  state: 0,
});
const getunSoldGoods = async () => {
  const res = await getunSoldGoodsList(params.value);
  goodsList.value = res.data.rows;
  total.value = Number(res.data.totalNum);
};

onMounted(() => getunSoldGoods());

const tabChange = (type) => {
  params.value.state = (Number(type) - 1).toString();
  getunSoldGoods();
};
const pageChange = (page) => {
  params.value.pageNum = page;
  getunSoldGoods();
};
const reject = async (gId) => {
  await updateGoodsState({ gId, state: "1" });
  ElMessage({ type: "success", message: "商品下架重审成功" });
  location.reload();
};
const accept = async (gId) => {
  await updateGoodsState({ gId, state: "0" });
  ElMessage({ type: "success", message: "商品通过审核成功" });
  location.reload();
};
</script>

<template>
  <div class="main">
    <div class="goods-container">
      <el-tabs @tab-change="tabChange">
        <!-- tab切换 -->
        <el-tab-pane
          v-for="item in tabTypes"
          :key="item.name"
          :label="item.label"
        />

        <div class="main-container">
          <div class="holder-container" v-if="goodsList.length === 0">
            <el-empty description="暂无待售商品" />
          </div>
          <div v-else>
            <!-- 订单列表 -->
            <div
              class="goods-item"
              v-for="goods in goodsList"
              :key="goods.state"
            >
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
                        {{ goods.state == 0 ? "已审核" : "待审核" }}
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="column amount">
                  <p class="red">¥{{ goods.prize }}</p>
                </div>
                <div class="column amount" v-if="goods.state == 0">
                  <el-button
                    type="danger"
                    size="large"
                    @click="reject(goods.gId)"
                    >下架重审</el-button
                  >
                </div>
                <div class="column amount" v-if="goods.state == 1">
                  <el-button
                    type="primary"
                    size="large"
                    @click="accept(goods.gId)"
                    >通过审核</el-button
                  >
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
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .goods-container {
    padding: 10px 20px;
    width: 1000px;
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
}
</style>
