<script setup>
import LayoutNav from "./components/LayoutNav.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixedHeader from "./components/LayoutFixedHeader.vue";

import { useCategoryStore } from "@/stores/category";
import { useUserStore } from "@/stores/user";

import { onMounted, ref } from "vue";

const categoryStore = useCategoryStore();

const userStore = useUserStore();
const userInfo = ref(userStore.userInfo.userInfoVo);
onMounted(() => categoryStore.getCategory());
</script>

<template>
  <LayoutFixedHeader v-if="userInfo.type === '0'" />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
