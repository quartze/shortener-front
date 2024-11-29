import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from "vitest";
import Hero from './Hero.vue';


describe("Hero component", () => {
    it("Render properly all informations", async () => {
        const wrapper = await mountSuspended(Hero, {});

        const title = wrapper.find("h2");
        const inputCutter = wrapper.find('label[for="short_url_input"]');

        expect(title.exists()).toBe(true);
        expect(inputCutter.exists()).toBe(true);
    })
})