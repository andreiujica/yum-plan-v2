// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/fonts",
  ],
  ui: {
    icons: ["tabler"],
    safelistColors: ["red", "orange", "yellow", "green", "blue", "violet"],
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "YumPlan",
      viewport: "width=device-width, initial-scale=0.9",
    },
  },
});
