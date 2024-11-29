import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi } from 'vitest';
import ShortsWrapper from './ShortsWrapper.vue';

describe('ShortsWrapper', () => {
  it('renders correctly with default state', async () => {
    const wrapper = await mountSuspended(ShortsWrapper, {});

    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('button').text()).toContain('CUT');
  });
});
