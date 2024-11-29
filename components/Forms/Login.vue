<template>
  <form @submit.prevent class="min-w-96 p-6 my-4 bg-white border-2 border-zinc-200">
    <div class="my-4 font-bold text-center">Login</div>
    <small aria-live="polite" v-if="errorMessage" class="error block max-w-96 my-4 text-red-500">{{
      errorMessage
    }}</small>
    <Input id="email" name="email" autocomplete="email" required v-model="email" label="Email" type="email" />
    <Input id="password" name="password" autocomplete="current-password" required v-model="password" label="Password" type="password" />
    <Button :disabled="isFetching" @click="logIn" class="w-full">
      <span v-if="!isFetching">Login</span>
      <span v-else>
        <Icon class="mx-auto text-2xl animate-spin" icon="ei:spinner-2" />
      </span>
    </Button>
    <small class="block text-xs text-center mt-6 font-light"
      >You don't have an account? <br />
      <NuxtLink title="Register new account" to="/auth/register" class="move-to-account">Register new account for free!</NuxtLink></small
    >
  </form>
</template>

<script lang="ts" setup>
  import { useMyUserStore } from "~/stores/user";
  import Input from "../Input/Input.vue";
  import { Icon } from "@iconify/vue";

  const { $api } = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();
  const router = useRouter();

  const userStore = useMyUserStore();
  const { fetchUser } = userStore;

  const errorMessage = ref<string>("");
  const email = ref<string>("");
  const password = ref<string>("");
  const isFetching = ref<boolean>(false);

  const logIn = async () => {
    if (isFetching.value) return;
    isFetching.value = true;

    if (!email.value || !password.value) {
      errorMessage.value = "All fields are required";
      isFetching.value = false;
      return;
    }

    errorMessage.value = "";

    try {
      const { data } = await $api.post("/auth/login", {
        email: email.value,
        password: password.value,
      });

      localStorage.setItem(runtimeConfig.public.accessTokenName, data.token);
      localStorage.setItem(runtimeConfig.public.refreshTokenName, data.refresh);

      fetchUser();
      router.push("/");
    } catch (err: any) {
      errorMessage.value = err.response.data.message || "An unexpected error occurred";
    } finally {
      isFetching.value = false;
    }
  };
</script>
