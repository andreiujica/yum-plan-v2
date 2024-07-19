// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/fonts",
  ],
  ui: {
    icons: ["tabler"],
  },
  css: ["~/assets/css/main.css"],
});
