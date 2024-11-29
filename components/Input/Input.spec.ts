import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, expect, it } from "vitest";
import Input from "./Input.vue";
import type { IInputProps } from "~/types/Components/Input";

describe("Input component", () => {
  it("Render normally", async () => {
    const wrapper = await mountSuspended(Input, {
      props: <IInputProps>{
        id: "input",
        name: "input",
        type: "text",
        modelValue: "test",
      },
    });

    const input = wrapper.find("input");

    expect(input.attributes("id")).toBe("input");
    expect(input.attributes("name")).toBe("input");
    expect(input.attributes("value")).toBe("test");
    expect(input.attributes("type")).toBe("text");
  });

  it("Render with label", async () => {
    const wrapper = await mountSuspended(Input, {
      props: <IInputProps>{
        id: "input",
        name: "input",
        type: "text",
        modelValue: "test",

        label: "Input",
      },
    });

    const label = wrapper.find("label");

    expect(label.text()).toBe("Input");
  });

  it("Render with label and required value", async () => {
    const wrapper = await mountSuspended(Input, {
      props: <IInputProps>{
        id: "input",
        name: "input",
        type: "text",
        modelValue: "test",

        label: "Input",
        required: true,
      },
    });

    const label = wrapper.find("label");
    const input = wrapper.find("input[required]");

    expect(label.text()).toBe("Input *");
    expect(input.exists()).toBe(true);
    expect(input.attributes("aria-required")).toBe("true");
  });

  it("Test proper v-model emits", async () => {
    const wrapper = await mountSuspended(Input, {
      props: <IInputProps>{
        id: "input",
        name: "input",
        type: "text",
        modelValue: "test",
      },
    });

      const input = wrapper.find("input");

      expect(input.attributes("value")).toBe("test");

      await input.setValue("updated");

      expect(wrapper.emitted("update:modelValue")).toEqual([["updated"]]);
  });
});
