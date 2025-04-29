<script setup lang="ts">
import Card from "../components/Card.vue";

interface IProject {
  title: string,
  text: string;
  url: string;
  icon: {
    type: "lucide" | "svg",
    value: string
  }
}

const projects: { title: string; items: IProject[] }[] = [
  {
    title: "Payment",
    items: [
      {
        title: "Promtpay",
        text: "Generate PromptPay QRCode (QR29) (Powered by promptparse)",
        url: "/tools/qrcode/promptpay",
        icon: {
          type: "svg",
          value: "/pp.svg"
        }
      },
      {
        title: "Promtpay (Billing)",
        text: "Generate PromptPay QRCode (QR30) (Powered by promptparse)",
        url: "/tools/qrcode/promptpay/billing",
        icon: {
          type: "svg",
          value: "/pp.svg"
        }
      },
      {
        title: "Promtpay (Barcode)",
        text: "Generate PromptPay Barcode (Powered by promptparse)",
        url: "/tools/qrcode/promptpay/barcode",
        icon: {
          type: "svg",
          value: "/pp-barcode.svg"
        }
      },
      {
        title: "Promtpay validator",
        text: "Validate promptpay (Pay & Slip) is valid or not. (Powered by promptparse)",
        url: "/tools/validator/payment/promptpay",
        icon: {
          type: "svg",
          value: "/pp.svg"
        }
      },
      {
        title: "Truemoney (QRCode)",
        text: "Generate Truemoney QRCode (Powered by promptparse)",
        url: "/tools/qrcode/truemoney",
        icon: {
          type: "svg",
          value: "/tmn.svg"
        }
      },
    ]
  },
]

</script>

<template>
  <div>
    <div v-for="(group) in projects">
      <h4 class="text-white text-2xl mb-4 font-bold uppercase" v-text="group.title" />
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card v-for="(data) in group.items" :title="data.title" :text="data.text" :url="data.url"
          :icon="data.icon.value" />
      </div>
    </div>
  </div>
</template>
