<script setup lang="ts">
import Card from "../components/Card.vue";
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <Card
      title="PromptPay"
      text="Generate promptpay QRCode (Powered by promptparse)"
      url="/prompt-pay"
      icon="/pp.svg"
    />
  </div>

  <footer class="text-white mt-12">
    <p class="text-center">
      Made with 💖 by
      <a href="https://m307.dev" class="underline text-purple-500">M-307</a>
    </p>
  </footer>
</template>
