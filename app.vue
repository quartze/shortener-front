<template>
  <main>
    <NuxtPage />
  </main>
</template>

<script setup>
import "@fontsource/geist-mono/index.css"

const userStore = useMyUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>