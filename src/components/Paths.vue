<script setup lang="ts">
import { ref, watch } from "vue";
import routes from "../router";
import ArrowRightIcon from "./icon/ArrowRightIcon.vue";

const path = window.location.pathname;
let speratePath = ref(path.split("/").slice(1));


watch(
  () => routes.currentRoute.value.fullPath,
  (n) => {
    speratePath.value = n.split("/").slice(1);
  }
);
</script>

<template>
  <ol class="flex items-center whitespace-nowrap">
    <li class="inline-flex items-center">
      <RouterLink
        class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
        to="/">
        Home
      </RouterLink>
      <ArrowRightIcon />
    </li>
    <li class="inline-flex items-center" v-for="(data, idx) in speratePath" :key="idx">
      <RouterLink
        class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
        :to="`/${speratePath.slice(0, idx + 1).join('/')}`">
        {{ data }}
      </RouterLink>
      <ArrowRightIcon v-if="idx !== speratePath.length - 1" />
    </li>
  </ol>
</template>
