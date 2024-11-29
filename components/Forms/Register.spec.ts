import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Register from "~/pages/auth/register.vue";

describe("Register component", () => {
  it("Render register form", async () => {
    const wrapper = await mountSuspended(Register, {});

    const loginInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const rePasswordInput = wrapper.find('input[name="re-password"]');
    const button = wrapper.find("button");

    expect(loginInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
    expect(rePasswordInput.exists()).toBe(true);
    expect(button.exists()).toBe(true);
  });

  it("Password matches", async () => {
    const wrapper = await mountSuspended(Register, {});

    const passwordInput = wrapper.find('input[name="password"]');
    const rePasswordInput = wrapper.find('input[name="re-password"]');

    passwordInput.setValue("Test1");
    rePasswordInput.setValue("Test1");

    expect(passwordInput.element.value).toBe(rePasswordInput.element.value);
  });

  it("Password does not match", async () => {
    const wrapper = await mountSuspended(Register, {});

    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const rePasswordInput = wrapper.find('input[name="re-password"]');
    const button = wrapper.find("button");

    emailInput.setValue("email@email.com");
    passwordInput.setValue("Test1");
    rePasswordInput.setValue("Test12");

    await button.trigger("click");

    const error = wrapper.find("small.error");
    expect(error.text()).toBe("Passwords do not match");
  });
});
