<template>
  <div class="flex flex-col lg:flex-row items-stretch gap-4">
    <ShortsInput :error="cuttingError" placeholder="What's your URL?" v-model="originalUrl" />
    <Button
      @click="createShortUrl"
      :disabled="isCutting"
      class="w-full lg:w-auto flex items-center justify-center gap-2">
      <template v-if="isCutting">
        <Icon icon="ix:cut-filled" />
        <span>CUTTING...</span>
      </template>
      <template v-else>
        <Icon icon="ix:cut-filled" />
        <span>CUT</span>
      </template>
    </Button>
    <Popup v-model:show="cuttingPopup">
      <div class="text-2xl mb-2 font-bold">Done!</div>
      <p class="text-sm">Your short url is ready for you!</p>
      <p class="text-sm">You can copy it and paste it somewhere else!</p>
      <ShortsInput class="my-4" readOnly :modelValue="shortUrl" />
      <div class="text-xs rounded-lg text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer mt-2 flex items-center gap-2 justify-end" @click="copyToClipboard(shortUrl)">
        <Icon icon="mdi:clipboard-outline" />
        <span>Copy to Clipboard</span>
      </div>
      <div v-if="!user" class="mt-2 p-2 text-xs rounded-lg bg-zinc-50 text-zinc-600">
        <p class="text-sm mb-2 font-bold">Wait!</p>
        <p class="text-xs max-w-96">
          If you register an account, you can store your urls and check how many people clicked on
          them!
        </p>
        <NuxtLink to="/auth/register" class="text-xs mt-2 block text-primary-500 font-bold">Register for free now!</NuxtLINK>
      </div>
      <div v-else class="mt-2 p-2 text-xs rounded-lg bg-zinc-50 text-zinc-600">
        <p class="text-xs max-w-96">
          This url will be stored in your account. You can check how many people clicked on it.
        </p>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
  import { Icon } from "@iconify/vue";

  const emits = defineEmits(["change:addedNew"]);

  const userStore = useMyUserStore();
  const user = computed(() => userStore.user);

  const originalUrl = ref<string>("");
  const isCutting = ref<boolean>(false);
  const cuttingError = ref<string>("");
  const shortUrl = ref<string>("");
  const cuttingPopup = ref<boolean>(false);

  const { $api } = useNuxtApp();

  const createShortUrl = async () => {
    if (isCutting.value) return;
    isCutting.value = true;
    cuttingError.value = "";

    try {
      const { data } = await $api.post("/shorts", {
        original_url: originalUrl.value,
      });

      shortUrl.value = document.location.origin + "/" + data.shortUrl;
      cuttingPopup.value = true;
      originalUrl.value = "";
      emits("change:addedNew");
    } catch (err: any) {
      cuttingError.value = err.response.data.message;
      return;
    } finally {
      isCutting.value = false;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
</script>
