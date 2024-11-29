// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-29",
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  plugins: ['~/plugins/axios.client.ts'],
  ssr: false, // Single Page Application
  modules: ['@pinia/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      accessTokenName: "accessToken",
      refreshTokenName: "refreshToken",
      apiBaseUrl: "https://api.shortener.wavecloud.pl/api"
    }
  },
  devServer: {
    port: 7071
  }
});
