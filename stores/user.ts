import { defineStore } from "pinia";
import type { IUserStore } from "~/types/Stores/user";

export const useMyUserStore = defineStore("myUserStore", {
  state: () =>
    <IUserStore>{
      user: null,
      isLogged: false,
    },
  actions: {
    async fetchUser() {
      const runtimeConfig = useRuntimeConfig();
      const { $api } = useNuxtApp();

      const token = localStorage.getItem(runtimeConfig.public.accessTokenName);

      if (!token) return;

      try {
        const { data } = await $api.get("/auth/me");

        this.user = data;
        this.isLogged = true;
      } catch (error) {}
    },

    logout() {
      const runtimeConfig = useRuntimeConfig();
      const router = useRouter();

      localStorage.removeItem(runtimeConfig.public.accessTokenName);
      localStorage.removeItem(runtimeConfig.public.refreshTokenName);

      this.user = null;
      this.isLogged = false;

      router.push("/");
    },
  },
});
