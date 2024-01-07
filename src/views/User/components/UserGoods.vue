<script setup>
const tabTypes = [
  { name: "all", label: "全部商品" },
  { name: "unapproved", label: "待审核" },
  { name: "approved", label: "已审核" },
  { name: "unsold", label: "待出售" },
  { name: "sold", label: "已出售" },
];

const goodsList = [];
</script>

<template>
  <div class="goods-container">
    <el-tabs>
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
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in goods.skus" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ item.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>{{ item.attrsText }}</span>
                      </p>
                    </div>
                    <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ goods.goodsState }}</p>
                <p v-if="goods.goodsState === 3">
                  <a href="javascript:;" class="green">查看物流</a>
                </p>
                <p v-if="goods.goodsState === 4">
                  <a href="javascript:;" class="green">评价商品</a>
                </p>
                <p v-if="goods.goodsState === 5">
                  <a href="javascript:;" class="green">查看评价</a>
                </p>
              </div>
              <div class="column amount">
                <p class="red">¥{{ goods.payMoney?.toFixed(2) }}</p>
                <p>（含运费：¥{{ goods.postFee?.toFixed(2) }}）</p>
                <p>在线支付</p>
              </div>
              <div class="column action">
                <el-button
                  v-if="goods.goodsState === 1"
                  type="primary"
                  size="small"
                >
                  立即付款
                </el-button>
                <el-button
                  v-if="goods.goodsState === 3"
                  type="primary"
                  size="small"
                >
                  确认收货
                </el-button>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(goods.goodsState)">
                  <a href="javascript:;">再次购买</a>
                </p>
                <p v-if="[4, 5].includes(goods.goodsState)">
                  <a href="javascript:;">申请售后</a>
                </p>
                <p v-if="goods.goodsState === 1">
                  <a href="javascript:;">取消订单</a>
                </p>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination background layout="prev, pager, next" />
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
  bgoods: 1px solid #f5f5f5;

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
      bgoods-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        bgoods-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            bgoods-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              bgoods-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              bgoods: 1px solid #f5f5f5;
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
