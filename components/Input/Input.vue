<template>
  <label
    class="block my-4 text-base w-full px-4 py-2 bg-white border-2 border-gray-400 focus-within:border-gray-900">
    <span v-if="label" class="text-xs block mb-1 text-gray-600"
      >{{ label }} <abbr v-if="required" class="text-red-500">*</abbr></span
    >
    <input
      :type="type"
      :value="modelValue"
      @input="handleInputEvent"
      :id="id"
      :name="name"
      :autocomplete="autocomplete"
      :aria-required="required"
      :placeholder="placeholder"
      :required="required"
      class="bg-transparent w-full h-full block focus-visible:outline-none" />
  </label>
</template>

<script lang="ts" setup>
import type { IInputProps } from "~/types/Components/Input";

  const { required, modelValue, type, label, placeholder, id, name, autocomplete } = defineProps<IInputProps>();
  const emit = defineEmits(["update:modelValue"]);

  const handleInputEvent = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
  };
</script>
