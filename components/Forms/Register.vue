<template>
  <form @submit.prevent class="min-w-96 p-6 my-4 bg-white border-2 border-zinc-200">
    <div class="my-4 font-bold text-center">Register</div>
    <small aria-live="polite" v-if="errorMessage" class="block max-w-96 my-4 text-red-500">{{
      errorMessage
    }}</small>
    <Input id="email" name="email" autocomplete="email" required v-model="email" label="Email" type="email" />
    <Input id="password" name="password" autocomplete="current-password" required v-model="password" label="Password" type="password" />
    <Input id="re-password" name="re-password" autocomplete="current-password" required v-model="rePassword" label="Re-enter password" type="password" />
    <Button :disabled="isFetching" @click="registerMe" class="w-full">
      <span v-if="!isFetching">Sign up</span>
      <span v-else>
        <Icon class="mx-auto text-2xl animate-spin" icon="ei:spinner-2" />
      </span>
    </Button>
    <small class="block text-xs text-center mt-6 font-light"
      >You already have an account? <br />
      <NuxtLink to="/auth/login">Log in now.</NuxtLink></small
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
  const rePassword = ref<string>("");
  const isFetching = ref<boolean>(false);

  const registerMe = async () => {
    if (!email.value || !password.value || !rePassword.value) {
      errorMessage.value = "All fields are required";
      return;
    }
    if (password.value !== rePassword.value) {
      errorMessage.value = "Passwords do not match";
      return;
    }

    if (isFetching.value) return;
    isFetching.value = true;

    errorMessage.value = "";

    try {
      const { data } = await $api.post("/auth/register", {
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
