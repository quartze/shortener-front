import { describe, expect, it, vi } from 'vitest';
import { mountSuspended } from "@nuxt/test-utils/runtime"
import Button from "./Button.vue"
import type { IButtonProps } from '~/types/Components/Button';


describe("Button", () => {
    it("Render and can be clicked", async () => {
        const wrapper = await mountSuspended(Button, {
            slots: {
                default: () => "Submit"
            }
        })

        expect(wrapper.text()).toBe("Submit");

        expect(wrapper.find("button").exists()).toBe(true);
        expect(wrapper.find("button").classes()).toContain("bg-primary-700");

        expect(wrapper.find("button").attributes("disabled")).toBe(undefined);
    })

    it("Render and can be disabled", async () => {
        const wrapper = await mountSuspended(Button, {
            slots: {
                default: () => "Loading..."
            },
            props: <IButtonProps>{
                disabled: true
            }
        });

        expect(wrapper.text()).toBe("Loading...");

        expect(wrapper.find("button").attributes("disabled")).toBe("")
    })
})