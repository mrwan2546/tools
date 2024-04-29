<script setup lang="ts">
interface IInput {
  label: string;
  type: "number" | "text";
  placeholder?: string;
  min?: number;
  max?: number;
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
      :min="props.min"
      :max="props.max"
      class="mt-0 py-3 px-4 w-full rounded-lg text-sm bg-[#333333]"
      :placeholder="props.placeholder"
      @input="(e: any) => {
        let value = e.target.value || ''
        if(props.type === 'number') value = Number(value)
        emit('update:modelValue', value)
      }"
      autocomplete="off"
    />
  </div>
</template>
