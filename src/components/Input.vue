<script setup lang="ts">
interface IInput {
  label: string;
  type: "number" | "text";
  placeholder?: string;
  modelValue: string | number;
}

const props = defineProps<IInput>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label>{{ props.label }}</label>
    <input
      :value="props.modelValue"
      :type="props.type"
      class="mt-0 py-3 px-4 w-full rounded-lg text-sm bg-[#333333]"
      :placeholder="props.placeholder"
      @input="(e: any) => emit('update:modelValue', e.target.value)"
      autocomplete="off"
    />
  </div>
</template>
