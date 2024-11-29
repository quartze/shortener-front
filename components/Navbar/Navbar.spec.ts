import { useMyUserStore } from "./../../stores/user";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar.vue";
import { createPinia, setActivePinia } from "pinia";

describe("Navbar component", () => {
  it("Render normally", async () => {
    const wrapper = await mountSuspended(Navbar, {});

    const logo = wrapper.find('a[title="Home"]');
    const signUpButton = wrapper.find('a[title="Sign in"]');

    expect(logo.exists()).toBe(true);
    expect(signUpButton.exists()).toBe(true);
  });

  it("Render logged in user", async () => {
    const pinia = createPinia();
    setActivePinia(pinia);

    const userStore = useMyUserStore();

    userStore.user = {
      id: 1,
      email: "test@gmail.com",
      createdAt: new Date().toString(),
    };

    const wrapper = await mountSuspended(Navbar, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.find('a[title="Profile"]').text()).toBe("test@gmail.com");
  });
});
