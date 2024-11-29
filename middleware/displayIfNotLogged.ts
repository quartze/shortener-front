import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const userStore = useMyUserStore();

    // Load user if isnt loaded yet
    await userStore.fetchUser();

    const { isLogged } = storeToRefs(userStore); // Non-reactive access
    if (isLogged.value) {
      return navigateTo("/user");
    }
  }
});
