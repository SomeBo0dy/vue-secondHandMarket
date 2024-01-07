import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import Detail from "@/views/Detail/index.vue";
import User from "@/views/User/index.vue";
import UserInfo from "@/views/User/components/UserInfo.vue";
import UserOrder from "@/views/User/components/UserOrder.vue";
import UserGoods from "@/views/User/components/UserGoods.vue";

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
          path: "category/:id",
          component: Category,
        },
        {
          path: "detail/:id",
          component: Detail,
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
              path: "goods",
              component: UserGoods,
            },
            {
              path: "order",
              component: UserOrder,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

export default router;
