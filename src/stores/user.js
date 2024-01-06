import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";
export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});
    const getUserInfo = async ({ account, password, type }) => {
      const res = await loginAPI({ account, password, type });
      userInfo.value = res.data;
    };
    const clearUserInfo = () => {
      userInfo.value = {};
    };
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
