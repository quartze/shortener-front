<template>
  <div class="container mx-auto">
    <Navbar />
    <section class="mt-24">
      <ShortsInputShortsWrapper @change:added-new="fetchShortUrls" />
    </section>
    <section class="mt-12">
      <div class="mb-4">
        <strong>Total: {{ totalElements }}</strong>
      </div>
      <div class="overflow-x-scroll">
        <table class="w-full">
          <thead>
            <tr class="text-left bg-zinc-50 h-10">
              <th class="px-4">Short Url</th>
              <th class="px-4">Original Url</th>
              <th class="px-4">Opened by</th>
              <th class="px-4">Created at</th>
              <th class="px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="shortUrl in shortUrls" :key="shortUrl.id">
              <td class="py-2 px-4">{{ getShortUrl(shortUrl.shortUrl) }}</td>
              <td class="py-2 px-4">{{ shortUrl.originalUrl }}</td>
              <td class="py-2 px-4">{{ shortUrl.openedBy }}</td>
              <td class="py-2 px-4">{{ getDate(shortUrl.createdAt) }}</td>
              <td class="py-2 px-4">
                <ul class="flex items-center gap-8">
                  <li class="transition-colors hover:text-primary-500">
                    <NuxtLink
                      target="_blank"
                      class="flex hover:no-underline gap-2 items-center cursor-pointer"
                      :to="getShortUrl(shortUrl.shortUrl)">
                      <Icon icon="gridicons:external" />
                      <span>Open</span>
                    </NuxtLink>
                  </li>
                  <li
                    @click="deleteThisShortUrl(shortUrl)"
                    class="flex gap-2 items-center cursor-pointer transition-colors hover:text-primary-500">
                    <Icon icon="ant-design:delete-outlined" />
                    <span>Delete</span>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4">
        <ul class="flex items-center gap-4 justify-center">
          <li
            v-for="i in totalPages"
            :key="i"
            @click="changePage(i)"
            :class="{ 'text-primary-500': i === page, 'cursor-pointer p-2': true }">
            {{ i }}
          </li>
        </ul>
      </div>
      <Popup v-model:show="deletePopup">
        Are you sure you want to delete this short url?
        <ShortsInput :read-only="true" :model-value="getShortUrl(shortIdToDelete)" class="my-2" />
        <div class="flex items-center justify-between">
          <Button class="bg-red-500 hover:bg-red-600" @click="deleteShortUrl">Delete</Button>
          <Button class="bg-zinc-400" @click="deletePopup = false">Cancel</Button>
        </div>
      </Popup>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import type { IShortUrl } from "~/types/Stores/user";
  import { Icon } from "@iconify/vue";
  import { data } from "autoprefixer";
  import ShortsInput from "~/components/ShortsInput/ShortsInput.vue";

  const { $api } = useNuxtApp();

  const shortUrls = ref<IShortUrl[]>([]);
  const page = ref<number>(1);
  const limit = ref<number>(12);
  const isFetching = ref<boolean>(false);

  const shortIdToDelete = ref<string>("");
  const deletePopup = ref<boolean>(false);

  const totalPages = ref<number>(0);
  const totalElements = ref<number>(0);

  const changePage = (newPage: number) => {
    if (page.value == newPage) return;
    if (isFetching.value) return;
    page.value = newPage;
    fetchShortUrls();
  };

  const getShortUrl = (shortUrl: string) => {
    return location.origin + "/" + shortUrl;
  };

  const getDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const deleteThisShortUrl = (shortUrl: IShortUrl) => {
    shortIdToDelete.value = shortUrl.shortUrl;
    deletePopup.value = true;
  };

  const deleteShortUrl = async () => {
    if (isFetching.value) return;
    isFetching.value = true;
    try {
      await $api.delete(`/shorts/${shortIdToDelete.value}`);
      deletePopup.value = false;
      shortIdToDelete.value = "";
      isFetching.value = false;
      fetchShortUrls();
    } catch (err: any) {
      console.log(err);
    } finally {
      isFetching.value = false;
    }
  };

  const fetchShortUrls = async () => {
    if (isFetching.value) return;
    isFetching.value = true;
    try {
      const { data } = await $api.get("/shorts", {
        params: {
          page: page.value,
          perPage: limit.value,
        },
      });

      shortUrls.value = data.content;
      totalPages.value = data.page.totalPages;
      totalElements.value = data.page.totalElements;
    } catch (err: any) {
      console.log(err);
    } finally {
      isFetching.value = false;
    }
  };

  onMounted(() => fetchShortUrls());

  definePageMeta({
    middleware: "display-if-logged",
  });

  useSeoMeta({
    title: "Profile • SHRTL.",
    ogTitle: "Profile • SHRTL.",
    twitterTitle: "Profile • SHRTL.",
    description: "Your short urls on SHRTL.",
    ogDescription: "Your short urls on SHRTL.",
    twitterDescription: "Your short urls on SHRTL.",
  });
</script>
