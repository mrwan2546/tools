<script setup lang="ts">
import { ref, watch } from "vue";
import routes from "../routes";

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
        to="/"
      >
        Home
      </RouterLink>
      <svg
        class="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-if="speratePath.length > 0"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </li>
    <li
      class="inline-flex items-center"
      v-for="(data, idx) in speratePath"
      :key="idx"
    >
      <RouterLink
        class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
        :to="`/${data}`"
      >
        {{ data }}
      </RouterLink>
    </li>
  </ol>
</template>
