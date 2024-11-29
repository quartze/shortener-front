<template>
    <div class="container mx-auto py-6 px-8 xl:px-0 grid grid-cols-2 gap-4 justify-between items-center">
      <h1 class="text-4xl font-mono font-black">
        <NuxtLink title="Home" class="hover:no-underline" to="/">SHRTL.</NuxtLink>
      </h1>
      <div class="flex items-center justify-end gap-4">
        <NuxtLink
          title="Sign in"
          to="/auth/login"
          v-if="!user"
          class="flex items-center justify-end gap-2">
          <Icon icon="ant-design:user-outlined" />
          <span>Sign in</span>
        </NuxtLink>
        <NuxtLink
          title="Profile"
          to="/user"
          v-else
          class="hover:no-underline flex items-center justify-end gap-2">
          <Icon icon="ant-design:user-outlined" />
          <span>{{ user.email }}</span>
        </NuxtLink>
        <Icon
          @click="userStore.logout()"
          aria-label="Logout"
          tabindex="0"
          v-if="user"
          class="cursor-pointer"
          icon="qlementine-icons:on-off-16" />
      </div>
    </div>
</template>

<script setup lang="ts">
  import { Icon } from "@iconify/vue";

  const userStore = useMyUserStore();

  const user = computed(() => userStore.user);
</script>
