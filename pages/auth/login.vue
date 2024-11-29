<template>
  <div>
    <Navbar />
    <section class="flex items-center justify-center h-[600px]">
      <FormsLogin />
    </section>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: "display-if-not-logged",
  });

  useSeoMeta({
    title: "Login • SHRTL.",
    ogTitle: "Login • SHRTL.",
    twitterTitle: "Login • SHRTL.",
    description: "Login to your account on SHRTL.",
    ogDescription: "Login to your account on SHRTL.",
    twitterDescription: "Login to your account on SHRTL.",
  });
</script>
