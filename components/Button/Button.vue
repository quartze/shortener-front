<template>
  <button
    :disabled="disabled"
    :aria-disabled="disabled"
    class="py-2 px-4 font-black transition-colors block text-base uppercase tracking-wide text-primary-50"
    :class="{
      'bg-zinc-500 cursor-default pointer-events-none': disabled,
      'bg-primary-700 hover:bg-primary-500': !disabled,
    }">
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { type IButtonProps } from "~/types/Components/Button";

  const { disabled } = defineProps<IButtonProps>();
</script>
