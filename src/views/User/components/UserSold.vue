<script setup>
import { getUserDeal, updateOrder } from "@/apis/order";
import { onMounted, ref } from "vue";
// tab列表
const tabTypes = [
  { name: "all", label: "全部交易" },
  { name: "proceessing", label: "交易处理中" },
  { name: "success", label: "交易完成" },
  { name: "failed", label: "交易失败" },
];
// 订单列表
const orderList = ref([]);
const total = ref(0);
const params = ref({
  pageNum: 1,
  pageSize: 3,
  orderState: 0,
});
const getDealList = async () => {
  const res = await getUserDeal(params.value);
  orderList.value = res.data.rows;
  total.value = Number(res.data.totalNum);
};

onMounted(() => getDealList());

const tabChange = (type) => {
  params.value.orderState = type;
  getDealList();
};
const pageChange = (page) => {
  params.value.pageNum = page;
  getDealList();
};
const accept = (order) => {
  order.state = 1;
  updateOrder(order);
};
const reject = (order) => {
  order.state = 2;
  updateOrder(order);
};
</script>

<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange">
      <!-- tab切换 -->
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
      />

      <div class="main-container">
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暂无交易数据" />
        </div>
        <div v-else>
          <!-- 订单列表 -->
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <div class="head">
              <span>下单时间：{{ order.createTime }}</span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li>
                    <a class="image" href="javascript:;">
                      <img :src="order.thumbnail" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ order.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>{{ order.title }}</span>
                      </p>
                    </div>
                    <div class="column state">
                      {{
                        order.state == 0
                          ? "交易处理中"
                          : order.state == 1
                          ? "交易成功"
                          : "交易失败"
                      }}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="column amount">
                <p class="red">¥{{ order.prize }}</p>
              </div>
              <div class="column amount" v-if="order.state == 0">
                <el-button type="primary" size="large" @click="accept(order)"
                  >接受交易</el-button
                >
              </div>
              <div class="column amount" v-if="order.state == 0">
                <el-button type="danger" size="large" @click="reject(order)"
                  >拒绝交易</el-button
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
</template>

<style scoped lang="scss">
.order-container {
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

.order-item {
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
