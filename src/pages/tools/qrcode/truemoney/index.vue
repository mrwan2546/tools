<script setup lang="ts">
import { reactive } from "vue";
import CardText from "@/components/CardText.vue";
import Input from "@/components/Input.vue";

import { trueMoney } from "promptparse/generate";

const payload = reactive<{
  amount: number;
  mobile: string;
  message: string;
}>({
  amount: 10,
  mobile: "",
  message: "",
});
</script>

<template>
  <div class="flex justify-center">
    <CardText class="w-full lg:w-[30%]">
      <div class="space-y-3">
        <Input
          v-model="payload.mobile"
          type="text"
          placeholder="088xxxxxxx"
          label="Mobile "
        />
        <Input
          v-model="payload.amount"
          type="number"
          placeholder="1000.00"
          :min="0"
          :max="50000"
          label="Amount"
        />
        <Input
          v-model="payload.message"
          type="text"
          placeholder="Snack"
          label="Message (Optional)"
        />
      </div>
      <div v-if="payload.amount > 0 && payload.mobile" class="mt-6">
        <img
          class="mx-auto rounded-xl"
          :src="`https://zxing.org/w/chart?chs=256x256&cht=qr&chl=${encodeURIComponent(
            trueMoney({
              mobileNo: payload.mobile,
              amount: payload.amount,
              message: payload.message,
            })
          )}&choe=UTF-8`"
        />
      </div>
    </CardText>
  </div>
</template>
