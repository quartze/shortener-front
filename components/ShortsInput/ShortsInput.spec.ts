import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect } from "vitest";
import ShortsInput from "./ShortsInput.vue";
import type { IShortsInputProps } from "~/types/Components/ShortsInput";

describe("ShortsInput component", () => {
  it("renders correctly with default props", async () => {
    const wrapper = await mountSuspended(ShortsInput, {
      props: {
        modelValue: "",
        errorMessage: "",
        readOnly: false,
        placeholder: "Enter short URL",
      },
    });

    const input = wrapper.find("input");
    const label = wrapper.find("label");
    const errorMessage = wrapper.find("small");

    expect(label.exists()).toBe(true);
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Enter short URL");
    expect(errorMessage.exists()).toBe(false);
  });

  it("renders error message when errorMessage prop is provided", async () => {
    const wrapper = await mountSuspended(ShortsInput, {
      props: {
        modelValue: "",
        errorMessage: "This field is required",
        readOnly: false,
        placeholder: "Enter short URL",
      },
    });

    const errorMessage = wrapper.find("small");
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe("This field is required");
    expect(wrapper.find("label").classes()).toContain("border-red-500");
  });

  it("emits update:modelValue when input changes", async () => {
    const wrapper = await mountSuspended(ShortsInput, {
      props: {
        modelValue: "",
        errorMessage: "",
        readOnly: false,
        placeholder: "Enter short URL",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("new value");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["new value"]);
  });

  it("applies readOnly prop correctly", async () => {
    const wrapper = await mountSuspended(ShortsInput, {
      props: {
        modelValue: "",
        errorMessage: "",
        readOnly: true,
        placeholder: "Enter short URL",
      },
    });

    const input = wrapper.find("input");
    expect(input.attributes("readonly")).toBeDefined();
  });
});
