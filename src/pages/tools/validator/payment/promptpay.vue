<script setup lang="ts">
import { reactive } from "vue";
import CardText from "@/components/CardText.vue";
import CurrencyNum from "@/data/currency_num.json"
import { type DetectedBarcode, QrcodeCapture } from 'vue-qrcode-reader'

import { parse } from "promptparse"

function onDetect(value: DetectedBarcode[]) {
  const val = value[0].rawValue;
  const parsed = parse(val, true)
  if (parsed) {
    // Get tag value
    payload.valid = true
    payload.info.amount = ""
    payload.info.message = ""
    payload.info.currency.numId = ""
    payload.info.currency.code = ""


    // Get tag
    const mobile = parsed.getTagValue("29", "01")
    const citizenId = parsed.getTagValue("29", "02")
    const eWallet = parsed.getTagValue("29", "03")
    const bankAccount = parsed.getTagValue("29", "04")

    const amount = parsed.getTagValue("54")
    const currency = parsed.getTagValue("53")
    const message = parsed.getTagValue("81")

    if (mobile) {
      payload.info.type = "Mobile"
      payload.info.desination = `+${Number(mobile.substring(0, 4)).toString()}${mobile.substring(4)}`
    } else if (citizenId) {
      payload.info.type = "Citizen ID"
      payload.info.desination = citizenId
    } else if (eWallet) {
      payload.info.type = "E-Wallet"
      payload.info.desination = eWallet
    } else if (bankAccount) {
      payload.info.type = "Bank account"
      payload.info.desination = bankAccount
    }

    if (amount) {
      payload.info.amount = amount
    }
    if (currency) {
      payload.info.currency.numId = currency
      // @ts-expect-error
      payload.info.currency.code = CurrencyNum[currency]
    }
    if (message) {
      // Parse get text
      const texts = message.match(/.{1,4}/g) as string[]
      for (const text of texts) {
        payload.info.message += String.fromCharCode(parseInt(text, 16))
      }

    }
  }
}

const payload = reactive({
  valid: false,
  info: {
    type: "", // Mobile, E-Wallet, Citizen ID
    desination: "",
    message: "", // (TMN) Message
    amount: "",
    currency: {
      numId: "",
      code: ""
    },
  }
});
</script>

<template>
  <div class="flex justify-center">
    <div class="space-y-3 ">
      <CardText class="w-full">
        <div class="space-y-3">
          <label>Upload file:</label>
          <div class="mt-0 py-3 px-4 w-full rounded-lg text-sm bg-[#333333]">
            <QrcodeCapture @detect="onDetect" />
          </div>
        </div>
      </CardText>

      <div v-if="payload.valid">
        <CardText class="w-full">
          <table class="border border-neutral-700">
            <tbody>
              <tr>
                <td class="p-3">Type</td>
                <td class="p-3" v-text="payload.info.type"></td>
              </tr>
              <tr>
                <td class="p-3">Desination</td>
                <td class="p-3" v-text="payload.info.desination"></td>
              </tr>
              <tr v-if="payload.info.amount">
                <td class="p-3">Amount</td>
                <td class="p-3">{{ payload.info.amount }}</td>
              </tr>
              <tr v-if="payload.info.currency.numId">
                <td class="p-3">Currency</td>
                <td class="p-3">{{ payload.info.currency.code }} ({{ payload.info.currency.numId }})</td>
              </tr>
              <tr v-if="payload.info.message">
                <td class="p-3">Message</td>
                <td class="p-3">{{ payload.info.message }}</td>
              </tr>
            </tbody>
          </table>
        </CardText>
      </div>
    </div>

  </div>
</template>
