<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
  const { $api } = useNuxtApp();
  const router = useRouter();

  const { id } = useRoute().params;


  onBeforeMount(async () => {
    try {
      const { data } = await $api.get(`/shorts/${id}`);

      location.replace(data.originalUrl);
    } catch (err: any) {
      showError("This page does not exist");
    }
  });

  useSeoMeta({
    title: "Redirecting...",
  });
</script>
