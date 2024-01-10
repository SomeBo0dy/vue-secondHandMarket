import { ref } from "vue";
import { defineStore } from "pinia";

export const useGoodsStore = defineStore(
  "goods",
  (g) => {
    const goods = ref({});
    goods.value = g;
    return {
      goods,
    };
  },
  {
    persist: true,
  }
);
