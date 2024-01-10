<script setup>
import { ref } from "vue";
import { updateUserInfoAPI } from "@/apis/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import { uploadImgAPI } from "@/apis/upload";
const userStore = useUserStore();
const userInfo = ref(userStore.userInfo.userInfoVo);
//表单对象
const form = ref({
  avatar: userInfo.value.avatar,
  nickName: userInfo.value.nickName,
  sex: userInfo.value.sex,
  phoneNumber: userInfo.value.phoneNumber,
  qqNumber: userInfo.value.qqNumber,
  introduction: userInfo.value.introduction,
});
const sexList = [
  { key: "0", value: "男" },
  { key: "1", value: "女" },
  { key: "2", value: "未知" },
];
//规则对象
const rules = {
  avatar: [{ required: true, message: "头像图片不得为空", trigger: "blur" }],
  nickName: [{ required: true, message: "昵称不得为空", trigger: "blur" }],
  sex: [
    {
      required: true,
      message: "请选择商品种类",
      trigger: "change",
      //   type: "number",
    },
    // { validator: validateCategory, trigger: "blur" },
  ],
  phoneNumber: [{ required: true, message: "手机号不得为空", trigger: "blur" }],
  qqNumber: [{ required: true, message: "QQ号不得为空", trigger: "blur" }],
  introduction: [
    { required: true, message: "个人介绍不得为空", trigger: "blur" },
  ],
};
const uploadImg = async (item) => {
  const res = await uploadImgAPI(item);
  form.value.avatar = res.data;
};
const formRef = ref(null);
const router = useRouter();
const synchronize = () => {
  userInfo.value.avatar = form.value.avatar;
  userInfo.value.nickName = form.value.nickName;
  userInfo.value.sex = form.value.sex;
  userInfo.value.phoneNumber = form.value.phoneNumber;
  userInfo.value.qqNumber = form.value.qqNumber;
  userInfo.value.introduction = form.value.introduction;
};
const updateUserInfo = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await updateUserInfoAPI(form.value);
      synchronize();
      ElMessage({ type: "success", message: "个人信息更新成功" });
      router.replace({ path: "info" });
    }
  });
};
// const handleAvatarSuccess = (
//   response,
//   uploadFile
// ) => {
//   form.value.avatar = URL.createObjectURL(uploadFile.raw)
// }

// const beforeAvatarUpload = (rawFile) => {
//  if (rawFile.size / 1024 / 1024 > 5) {
//     ElMessage.error('Avatar picture size can not exceed 5MB!')
//     return false
//   }
//   return true
// }
</script>
<template>
  <div class="title">
    <h1>个人信息</h1>
  </div>
  <div class="form">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="left"
      label-width="120px"
      status-icon
    >
      <el-form-item prop="avatar" label="用户头像">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="uploadImg"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item prop="nickName" label="昵称">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option
            v-for="item in sexList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="phoneNumber" label="手机号">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item prop="qqNumber" label="QQ号">
        <el-input v-model="form.qqNumber" />
      </el-form-item>
      <el-form-item prop="introduction" label="个人介绍">
        <el-input
          v-model="form.introduction"
          :rows="2"
          type="textarea"
          placeholder="请介绍一下自己"
          size="large"
        />
      </el-form-item>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <el-button size="large" class="subBtn" @click="updateUserInfo"
          >保存信息</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<style lang="scss">
.title {
  padding: 20px 10px 10px 20px;
}
.form {
  padding: 30px 20px 20px 40px;
  .el-input {
    width: 300px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
