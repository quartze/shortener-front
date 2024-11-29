import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from "vitest";
import Card from './Card.vue';
import type { ICardProps } from '~/types/Components/Card';



describe("Card componnet", () => {
    it("Render and display text", async () => {
        const wrapper = await mountSuspended(Card, {
            props: <ICardProps>{
                title: "Hello World",
                content: "Lorem ipsum dolor sit amon.",
                icon: "mdi:account"
            }
        });

        expect(wrapper.find("h3").text()).toBe("Hello World");
        expect(wrapper.find("p").text()).toBe("Lorem ipsum dolor sit amon.");
        expect(wrapper.find("svg"));
    })
})