<script setup lang="ts">
import { reactive } from "vue";
import CardText from "../../components/CardText.vue";
import Input from "../../components/Input.vue";
import Select from "../../components/Select.vue";

import { anyId } from "promptparse/generate";

type Method = "MSISDN" | "NATID" | "EWALLETID" | "BANKACC";

const payload = reactive<{
  amount: number;
  value: string;
  method: Method;
}>({
  amount: 10,
  value: "",
  method: "MSISDN",
});
</script>

<template>
  <div class="flex justify-center">
    <CardText class="w-[30%]">
      <div class="space-y-3">
        <Input
          v-model="payload.amount"
          type="number"
          placeholder="1000.00"
          label="Amount"
        />
        <Input
          v-model="payload.value"
          type="text"
          placeholder="08xxxxxxxxx"
          label="Mobile, Citizen ID or E-Wallet"
        />
        <Select
          label="Method"
          v-model="payload.method"
          :items="[
            {
              text: 'Mobile number',
              value: 'MSISDN',
            },
            {
              text: 'Citizen ID',
              value: 'NATID',
            },
            {
              text: 'E-Wallet ID',
              value: 'EWALLETID',
            },
          ]"
        />
      </div>
      <div
        v-if="payload.amount > 0 && payload.value && payload.method"
        class="mt-6"
      >
        <img
          class="mx-auto rounded-xl"
          :src="`https://zxing.org/w/chart?chs=256x256&cht=qr&chl=${encodeURIComponent(
            anyId({
              target: payload.value,
              amount: payload.amount,
              type: payload.method,
            })
          )}&choe=UTF-8`"
        />
      </div>
    </CardText>
  </div>
</template>
