<script setup>
import { ref } from "vue";
import { uploadImgAPI } from "@/apis/upload";
import { useCategoryStore } from "@/stores/category";
import { UploadFilled } from "@element-plus/icons-vue";
import { updateGoodsAPI } from "@/apis/goods";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useGoodsStore } from "@/stores/goods";
const goodsStore = useGoodsStore();
const goods = ref(goodsStore.goods);
const categoryStore = useCategoryStore();
const categoryList = ref(categoryStore.categoryList);

// const validateCategory = (rule, value, callback) => {
//   if (value === "请选择种类") {
//     callback(new Error("请选择商品种类"));
//   } else {
//     callback();
//   }
// };
//规则对象
// const category = ref(Number(goods.value.categoryId));
const rules = {
  title: [{ required: true, message: "标签不得为空", trigger: "blur" }],
  name: [{ required: true, message: "商品名称不得为空", trigger: "blur" }],
  introduction: [
    { required: true, message: "商品介绍不得为空", trigger: "blur" },
  ],
  //   category_id: [
  //     {
  //       required: true,
  //       message: "请选择商品种类",
  //       trigger: "change",
  //       //   type: "number",
  //     },
  //     // { validator: validateCategory, trigger: "blur" },
  //   ],
  thumbnail: [{ required: true, message: "图片不得为空", trigger: "blur" }],
  prize: [{ required: true, message: "价格不得为空", trigger: "blur" }],
};

const uploadImg = async (item) => {
  const res = await uploadImgAPI(item);
  goods.value.thumbnail = res.data;
};
const formRef = ref(null);
const router = useRouter();

const updateGoods = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      await updateGoodsAPI(goods.value);
      ElMessage({ type: "success", message: "商品编辑成功" });
      router.replace({ path: "deleteGoods" });
    }
  });
};
</script>
<template>
  <div class="title">
    <h1>编辑商品</h1>
  </div>
  <div class="form">
    <el-form
      ref="formRef"
      :model="goods"
      :rules="rules"
      label-position="left"
      label-width="120px"
      status-icon
    >
      <el-form-item prop="title" label="标签">
        <el-input v-model="goods.title" />
      </el-form-item>
      <el-form-item prop="name" label="商品名称">
        <el-input v-model="goods.name" />
      </el-form-item>
      <el-form-item prop="introduction" label="商品介绍">
        <el-input
          v-model="goods.introduction"
          :rows="2"
          type="textarea"
          placeholder="请介绍商品"
          size="large"
        />
      </el-form-item>
      <el-form-item prop="category_id" label="商品种类">
        <el-select v-model="goods.categoryId" placeholder="请选择商品类型">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="thumbnail" label="图片">
        <el-upload
          class="upload"
          drag
          action
          multiple
          :http-request="uploadImg"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 5mb
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item prop="prize" label="价格">
        <el-input-number
          v-model="goods.prize"
          :precision="2"
          :step="1"
          :min="0"
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
        <el-button size="large" class="subBtn" @click="updateGoods"
          >保存商品</el-button
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
</style>
