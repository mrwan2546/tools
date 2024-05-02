import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "./views/Home.vue";
// Tool
import PromptPay from "./views/tools/PromptPay.vue";
import PromptPayBilling from "./views/tools/PromptPay-Billing.vue";
import PromptPayBarcode from "./views/tools/PromptPay-Barcode.vue";
import PromptPayTmn from "./views/tools/PromptPay-Tmn.vue";

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
  {
    path: "/prompt-pay-barcode",
    component: PromptPayBarcode,
  },
  {
    path: "/prompt-pay-tmn",
    component: PromptPayTmn,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
