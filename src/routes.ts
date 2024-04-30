import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
// Tool
import PromptPay from "./views/tools/PromptPay.vue";
import PromptPayBilling from "./views/tools/PromptPay-Billing.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/prompt-pay",
    component: PromptPay,
  },
  {
    path: "/prompt-pay-billing",
    component: PromptPayBilling,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
