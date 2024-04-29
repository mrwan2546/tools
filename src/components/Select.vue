<script setup lang="ts">
interface ISelect {
  label: string;
  items: { text: string; value: string }[];
  placeholder?: string;
  modelValue: string | number;
}

const props = defineProps<ISelect>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label>{{ props.label }}</label>
    <select
      class="mt-0 py-3 px-4 w-full rounded-lg text-sm bg-[#333333]"
      @change="(e: any) => emit('update:modelValue', e.target.value)"
    >
      <option
        v-for="(data, idx) in props.items"
        :key="idx"
        :value="data.value"
        :selected="data.value === props.modelValue"
      >
        {{ data.text }}
      </option>
    </select>
  </div>
</template>
