import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Register from "@/views/Register/index.vue";
import Administrator from "@/views/Administrator/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import Detail from "@/views/Detail/index.vue";
import User from "@/views/User/index.vue";
import UserInfo from "@/views/User/components/UserInfo.vue";
import UserEdit from "@/views/User/components/UserEdit.vue";
import UserOrder from "@/views/User/components/UserOrder.vue";
import UserGoods from "@/views/User/components/UserGoods.vue";
import UserSold from "@/views/User/components/UserSold.vue";
import UserAddGoods from "@/views/User/components/UserAddGoods.vue";
import UserDeleteGoods from "@/views/User/components/UserDeleteGoods.vue";
import GoodsEdit from "@/views/User/components/GoodsEdit.vue";

import Chat from "@/views/User/components/Chat.vue";

import Checkout from "@/views/Checkout/index.vue";
import Pay from "@/views/Pay/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "/admin",
          component: Administrator,
        },
        {
          path: "category/:id",
          component: Category,
        },
        {
          path: "detail/:id",
          component: Detail,
        },
        {
          path: "checkout",
          component: Checkout,
        },
        {
          path: "pay",
          component: Pay,
        },
        {
          path: "user",
          component: User,
          children: [
            {
              path: "info",
              component: UserInfo,
            },
            {
              path: "edit",
              component: UserEdit,
            },
            {
              path: "editGoods",
              component: GoodsEdit,
            },
            {
              path: "goods",
              component: UserGoods,
            },
            {
              path: "order",
              component: UserOrder,
            },
            {
              path: "sold",
              component: UserSold,
            },
            {
              path: "addGoods",
              component: UserAddGoods,
            },
            {
              path: "deleteGoods",
              component: UserDeleteGoods,
            },
            {
              path: "chat",
              component: Chat,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
  ],
});

export default router;
