import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
// Tool
import PromptPay from "./views/tools/PromptPay.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/prompt-pay",
    component: PromptPay,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
