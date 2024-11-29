<template>
  <div>
    <Navbar />
    <section class="flex items-center justify-center h-[600px]">
      <FormsRegister />
    </section>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: "display-if-not-logged",
  });

  useSeoMeta({
    title: "Register • SHRTL.",
    ogTitle: "Register • SHRTL.",
    twitterTitle: "Register • SHRTL.",
    description: "Register to your account on SHRTL.",
    ogDescription: "Register to your account on SHRTL.",
    twitterDescription: "Register to your account on SHRTL.",
  });
</script>
