<script setup lang="ts">
import { defineProps } from "vue";

interface ICard {
  title: string;
  text: string;
  url: string;
  icon: string;
}

const props = defineProps<ICard>();
</script>

<template>
  <RouterLink
    class="flex flex-col bg-[#232323] border border-neutral-700 shadow-none hover:shadow-lg rounded-xl transition-all hover:-translate-x-1 hover:-translate-y-1 cursor-pointer duration-200 hover:shadow-neutral-700/50"
    :to="url"
  >
    <div class="p-4 md:p-7">
      <img :src="props.icon" class="h-[32px] mb-2" />
      <h3 class="text-lg font-bold text-white">{{ props.title }}</h3>
      <p class="mt-2 text-neutral-400">
        {{ props.text }}
      </p>
    </div>
  </RouterLink>
</template>
