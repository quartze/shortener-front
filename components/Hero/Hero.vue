<template>
  <header
    role="banner"
    class="lg:h-[800px] h-auto p-6 lg:p-0 overflow-hidden flex items-center justify-center text-center flex-col">
    <div class="font-sans text-4xl font-bold">
      <strong>CUT</strong> your address URL to <strong>SHRTL</strong> version!
    </div>
    <ShortsInputShortsWrapper
      class="mt-10 lg:w-[800px] flex flex-col lg:flex-row items-center gap-4" />
    <div
      class="max-w-[800px] lg:mt-24 mt-12 flex flex-col lg:grid my-6 grid-cols-2 container mx-auto gap-4">
      <NuxtLink
        title="Why We Need Short Version of Our URLs"
        class="hover:no-underline"
        to="/articles/why-we-need-short-version-of-our-urls">
        <Card
          title="Why we need short version of our urls?"
          content="Learn the importance of a short link service and how it can improve your online presence and conversion rates."
          icon="ix:cut-filled" />
      </NuxtLink>
      <NuxtLink
        title="How Short URLs Boost Your Marketing Strategy"
        class="hover:no-underline"
        to="/articles/how-short-urls-boost-your-marketing-strategy">
        <Card
          title="How short URLs boost your marketing strategy"
          content="Learn how short URLs can boost your marketing strategy and drive more engagement and conversions."
          icon="mdi:paper-cut-vertical" />
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts"></script>
