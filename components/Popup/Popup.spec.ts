import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Popup from "./Popup.vue";

describe("Popup component", () => {
  it("Render popup", async () => {
    const wrapper = await mountSuspended(Popup, {
      props: {
        show: false,
      },
    });

    expect(wrapper.find("div").exists()).toBe(false);
  });

  it("Toggle popup", async () => {
    const wrapper = await mountSuspended(Popup, {
      props: {
        show: false,
      },
      attachTo: document.body,
    });

    expect(document.body.querySelector(".popup")).toBeNull();

    await wrapper.setProps({
      show: true,
    });

    expect(document.body.querySelector(".popup")).not.toBeNull();

    await wrapper.setProps({
      show: false,
    });

    expect(document.body.querySelector(".popup")).toBeNull();
  });
});
