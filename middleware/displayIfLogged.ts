import { storeToRefs } from 'pinia';

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useMyUserStore();
  const { isLogged } = storeToRefs(userStore); // Non-reactive access

  if (!isLogged.value) {
    return navigateTo("/auth/login");
  }
});