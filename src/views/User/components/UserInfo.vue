<script setup>
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const userInfo = ref(userStore.userInfo.userInfoVo);
</script>

<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img :src="userInfo?.avatar" />
      </div>
      <h4>{{ userInfo?.nickName }}</h4>
    </div>
    <div class="right">
      <el-button size="large" @click="$router.replace('edit')"
        >编辑个人信息</el-button
      >
    </div>
  </div>
  <div class="personal-info">
    <div class="info-details">
      <h1>个人信息</h1>
      <p><strong>昵称:</strong> {{ userInfo?.nickName }}</p>
      <p>
        <strong>性别:</strong>
        {{ userInfo?.sex == "0" ? "男" : userInfo?.sex == "1" ? "女" : "未知" }}
      </p>
      <p><strong>电话:</strong> {{ userInfo?.phoneNumber }}</p>
      <p><strong>QQ:</strong> {{ userInfo?.qqNumber }}</p>
      <!-- <p><strong>商品数量:</strong> {{ userInfo?.goodCount }}</p> -->
      <!-- <p><strong>商品强制下架次数:</strong> {{ userInfo?.rejectCount }}</p> -->
      <p><strong>个人介绍:</strong> {{ userInfo?.introduction }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.personal-info {
  font-family: Arial, sans-serif;
  max-width: 850px;
  margin-left: 50px;
  margin-top: 30px;
  display: flex;
  // align-items: center;
  min-height: 500px;
}

.info-details {
  text-align: left;
}

h1 {
  color: #333;
}

p {
  color: #666;
  margin: 30px 0;
  font-size: larger;
}
.home-overview {
  height: 132px;
  background: url(@/assets/images/center-bg.png) no-repeat center / cover;
  display: flex;
  .right {
    margin-right: 50px;
    margin-top: 50px;
  }
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
}
</style>
