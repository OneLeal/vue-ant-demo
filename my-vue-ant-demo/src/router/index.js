import Vue from "vue";
import VueRouter from "vue-router";
import Demo from "@views/demo";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/demo" },

  {
    path: "/demo",
    name: "Demo",
    meta: { title: "案例" },
    component: Demo,
    children: [
      {
        path: "/demo/cart",
        meta: { title: "案例-购物车" },
        component: () => import("@views/demo/components/cart"),
      },

      {
        path: "/demo/dynamicTable",
        meta: { title: "案例-动态表格" },
        component: () => import("@views/demo/components/dynamicTable"),
      },

      {
        path: "/demo/goodsCard",
        meta: { title: "案例-商品卡片" },
        component: () => import("@views/demo/components/goodsCard"),
      },

      {
        path: "/demo/goodsInfo",
        meta: { title: "案例-商品信息" },
        component: () => import("@views/demo/components/goodsInfo"),
      },

      {
        path: "/demo/dialog",
        meta: { title: "对话框" },
        component: () => import("@views/demo/components/dialog"),
      },
    ],
  },

  {
    path: "/mall",
    name: "Mall",
    meta: { title: "商城" },
    component: () => import("@views/mall"),
  },

  {
    path: "/vant",
    name: "Vant",
    meta: { title: "移动端页面" },
    component: () => import("@views/vantDemo"),
  },
];
// component: () => import("../views/About.vue")
const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  if (to.path === "/demo") {
    next({ path: "/demo/cart" });
  } else {
    next();
  }
});

export default router;
