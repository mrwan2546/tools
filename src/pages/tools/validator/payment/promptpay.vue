<script setup lang="ts">
import { reactive } from "vue";
import CardText from "@/components/CardText.vue";
import CurrencyNum from "@/data/currency_num.json"
import BankCode from "@/data/banks.json"
import { type DetectedBarcode, QrcodeCapture } from 'vue-qrcode-reader'

import { parse } from "promptparse"
import dayjs from "@/utils/dayjs";


function onDetect(value: DetectedBarcode[]) {
  const val = value[0].rawValue;
  const parsed = parse(val, true)
  if (parsed) {
    // Clear data
    payload.valid = true
    payload.info.desination = ""
    payload.info.type = ""
    payload.info.amount = ""
    payload.info.message = ""
    payload.info.currency.numId = ""
    payload.info.currency.code = ""
    payload.info.slip.bank.code = ""
    payload.info.slip.bank.name = ""
    payload.info.slip.date = ""
    payload.info.slip.transfer = ""

    // Get tag
    const mobile = parsed.getTagValue("29", "01")
    const citizenId = parsed.getTagValue("29", "02")
    const eWallet = parsed.getTagValue("29", "03")
    const bankAccount = parsed.getTagValue("29", "04")

    const amount = parsed.getTagValue("54")
    const currency = parsed.getTagValue("53")
    const message = parsed.getTagValue("81")

    const tag00 = parsed.getTagValue("00", "00")
    const tag01 = parsed.getTagValue("00", "01")
    const tag02 = parsed.getTagValue("00", "02")
    const tag03 = parsed.getTagValue("00", "03")
    const tag04 = parsed.getTagValue("00", "04")

    // Check if slip verify
    if (tag00 && tag01 && tag02) {
      if (tag02 === "P2P" && tag03 && tag04) {
        payload.info.kind = "QR Slip (Truemoney)"
        payload.info.slip.transfer = tag03
        payload.info.slip.date = dayjs(tag04, "DDMMYYYY").format("DD MMM YYYY")
      } else {
        payload.info.kind = "QR Slip (Promptpay)"
        payload.info.slip.transfer = tag02
        // @ts-expect-error 
        payload.info.slip.bank.name = BankCode[tag01] ?? "Unknown"
        payload.info.slip.bank.code = tag01
      }
    } else {
      payload.info.kind = "QR Promptpay"

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
        payload.info.kind = "QR Truemoney"

        // Parse get text
        const texts = message.match(/.{1,4}/g) as string[]
        for (const text of texts) {
          payload.info.message += String.fromCharCode(parseInt(text, 16))
        }
      }
    }
  }
}

const payload = reactive({
  valid: false,
  info: {
    kind: "", // PromptPay QR, Truemoney QR, Slip
    type: "", // Mobile, E-Wallet, Citizen ID
    desination: "",
    message: "", // (TMN) Message
    amount: "",
    currency: {
      numId: "",
      code: ""
    },
    slip: {
      transfer: "",
      bank: {
        code: "",
        name: ""
      },
      date: "",
      type: ""
    }
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
                <td class="p-3">QR Type</td>
                <td class="p-3" v-text="payload.info.kind ?? 'Unknown'"></td>
              </tr>
              <tr v-if="payload.info.type">
                <td class="p-3">Type</td>
                <td class="p-3" v-text="payload.info.type"></td>
              </tr>
              <tr v-if="payload.info.slip.transfer">
                <td class="p-3">Transfer ID</td>
                <td class="p-3" v-text="payload.info.slip.transfer"></td>
              </tr>
              <tr v-if="payload.info.slip.date">
                <td class="p-3">Transfer date</td>
                <td class="p-3" v-text="payload.info.slip.date"></td>
              </tr>
              <tr v-if="payload.info.slip.bank.code">
                <td class="p-3">Bank</td>
                <td class="p-3">{{ payload.info.slip.bank.name }} ({{ payload.info.slip.bank.code }})</td>
              </tr>
              <tr v-if="payload.info.desination">
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
