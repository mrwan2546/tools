<script setup lang="ts">
import { reactive } from "vue";
import CardText from "@/components/CardText.vue";
import Input from "@/components/Input.vue";

import { botBarcode } from "promptparse/generate";

const payload = reactive({
  amount: 10,
  ref1: "",
  ref2: "",
  billId: "",
});
</script>

<template>
  <div class="flex justify-center">
    <CardText class="w-full lg:w-[30%]">
      <div class="space-y-3">
        <Input v-model="payload.billId" type="text" label="Billing ID" />
        <Input v-model="payload.ref1" type="text" label="Ref #1" />
        <Input v-model="payload.ref2" type="text" label="Ref #2 (Optional)" />
        <Input
          v-model="payload.amount"
          type="number"
          placeholder="1000.00"
          :min="0"
          :max="50000"
          label="Amount"
        />
      </div>
      <div
        v-if="payload.amount > 0 && payload.ref1 && payload.billId"
        class="mt-6"
      >
        <img
          class="mx-auto rounded-xl p- bg-white"
          :src="`https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(
            botBarcode({
              billerId: payload.billId,
              amount: payload.amount,
              ref1: payload.ref1,
              ref2: payload.ref2,
            })
          )}`"
        />
      </div>
    </CardText>
  </div>
</template>
