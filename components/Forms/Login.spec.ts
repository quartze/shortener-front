import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Login from "./Login.vue";

describe("Login component", () => {
  it("Render login form", async () => {
    const wrapper = await mountSuspended(Login, {});

    const loginInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const button = wrapper.find("button");

    expect(loginInput.exists()).toBe(true);
    expect(passwordInput.exists()).toBe(true);
    expect(button.exists()).toBe(true);
  });

  it("Send form and display error", async () => {
    const wrapper = await mountSuspended(Login, {});

    const button = wrapper.find("button");

    await button.trigger("click");
    expect(button.attributes("disabled")).toBe(undefined);

    expect(wrapper.find("small.error").exists()).toBe(true);
  });
});
