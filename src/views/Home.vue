<script setup lang="ts">
import Card from "../components/Card.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
    <Card
      title="PromptPay"
      text="Generate PromptPay QRCode (QR29) (Powered by promptparse)"
      url="/prompt-pay"
      icon="/pp.svg"
    />
    <Card
      title="PromptPay (Billing)"
      text="Generate PromptPay QRCode (QR30) (Powered by promptparse)"
      url="/prompt-pay-billing"
      icon="/pp.svg"
    />
    <Card
      title="PromptPay (Barcode)"
      text="Generate PromptPay Barcode (Powered by promptparse)"
      url="/prompt-pay-barcode"
      icon="/pp-barcode.svg"
    />
  </div>

  <footer class="text-white mt-12">
    <p class="text-center">
      Made with 💖 by
      <a href="https://m307.dev" class="underline text-purple-500">M-307</a>
    </p>
  </footer>
</template>
