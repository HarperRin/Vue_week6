import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/FrontView.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/IndexView.vue"),
      },
      {
        path: "products",
        name: "產品列表",
        component: () => import("../views/ProductsView.vue"),
      },
      {
        path: "product/:id",
        name: "產品頁面",
        component: () => import("../views/ProductView.vue"),
      },
      {
        path: "cart",
        name: "購物車",
        component: () => import("../views/CartView.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/admin",
    component: () => import("../views/DashboardView.vue"),
    children: [
      {
        path: "products",
        component: () => import("../views/AdminProducts.vue"),
      },
      {
        path: "orders",
        component: () => import("../views/AdminOrders.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active", // Bootstrap
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (to.fullPath.match("FrontView")) {
      return {
        top: 0,
      };
    }
    return {};
  },
});

export default router;
