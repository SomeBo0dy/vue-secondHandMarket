<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const userInfo = ref(userStore.userInfo);
const confirm = () => {
  userStore.clearUserInfo();
  router.push("/login");
};
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userInfo.token">
          <li>
            <a href="javascript:;"
              ><i class="iconfont icon-user"></i
              >{{ userInfo.userInfoVo.nickName }}</a
            >
          </li>
          <li>
            <el-popconfirm
              @confirm="confirm"
              title="确认退出吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
            >
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li v-if="!userInfo || userInfo.userInfoVo.type === '0'">
            <RouterLink to="/user/order">我的订单</RouterLink>
          </li>
          <li v-if="!userInfo || userInfo.userInfoVo.type === '0'">
            <RouterLink to="/user/info">用户中心</RouterLink>
          </li>
        </template>
        <template v-else>
          <li>
            <a href="javascript:;" @click="$router.push('/login')">请先登录</a>
          </li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
