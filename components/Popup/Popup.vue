<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        role="dialog"
        :aria-hidden="!show"
        v-if="show"
        @mousedown="togglePopup"
        class="popup fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm flex items-center justify-center bg-opacity-40 z-20">
        <div
          @mousedown.stop
          class="bg-white shadow-2xl shadow-primary-500/50 p-6 rounded-lg left-0 right-0 min-w-96 fixed bottom-0 lg:left-auto lg:right-auto lg:h-auto lg:bottom-auto h-[80%]">
          <div
            @click="togglePopup"
            tabindex="0"
            aria-label="Close popup"
            class="close-popup bg-zinc-50 ml-auto mb-2 hover:bg-zinc-100 transition-colors text-right rounded-full w-12 h-12 text-lg flex items-center justify-center cursor-pointer">
            <Icon icon="mdi:close" />
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { Icon } from "@iconify/vue";
  import type { IPopupProps } from "~/types/Components/Popup";

  const { show } = defineProps<IPopupProps>();
  const emit = defineEmits(["update:show"]);

  const togglePopup = () => {
    emit("update:show", !show);
  };
</script>
