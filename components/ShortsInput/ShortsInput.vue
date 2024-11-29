<template>
  <label
    for="short_url_input"
    :class="{ 'group block w-full px-6  py-4 min-w-96 bg-white/90 border-2 backdrop-blur-2xl relative': true,
    'border-red-500': errorMessage, 'border-primary-300' : !errorMessage}">
    <input
      type="text"
      id="short_url_input"
      name="short_url_input"
      :readonly="readOnly"
      :aria-invalid="!!errorMessage"
      :value="modelValue"
      @input="onUpdateInput"
      :placeholder="placeholder"
      class="bg-transparent w-full h-full block focus-visible:outline-none" />
    <small
      v-if="errorMessage"
      className="group-hover:opacity-0 z-10 bg-white group-focus-within:opacity-0 transition-opacity pointer-events-none absolute text-red-500 right-4 bgwhite p-2 top-0 bottom-0 flex items-center"
      >{{ errorMessage }}</small
    >
  </label>
</template>

<script setup lang="ts">
  import { type IShortsInputProps } from "~/types/Components/ShortsInput";

  const { errorMessage, modelValue, readOnly, placeholder } = defineProps<IShortsInputProps>();

  const emit = defineEmits(["update:modelValue"]);

  const onUpdateInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit("update:modelValue", target.value);
  };
</script>
