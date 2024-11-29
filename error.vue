<template>
  <div class="container mx-auto">
    <Navbar />
    <h1 class="text-4xl font-bold mt-24">Oops!</h1>
    <p class="mt-4">{{ error?.message }}</p>
    <Button @click="handleError">Back to home</Button>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from '#app';


const { error } = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })

</script>

<style></style>
