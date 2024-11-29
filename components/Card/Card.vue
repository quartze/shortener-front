<template>
  <div
    class="p-4 border-zinc-200 border-2 hover:border-primary-500 transition-transform cursor-pointer hover:scale-105">
    <div class="grid grid-cols-6 gap-2 items-center">
      <div class="flex items-center justify-center text-center col-span-1">
        <Icon class="text-4xl text-primary-500" :icon="icon" />
      </div>
      <div class="col-span-5 font-bold text-zinc-900 text-left">
        <h3 class="text-sm">{{ title }}</h3>
        <p class="text-xs font-light mt-1">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from "@iconify/vue";
  import { type ICardProps } from "~/types/Components/Card";

  const { title, content, icon } = defineProps<ICardProps>();
</script>
