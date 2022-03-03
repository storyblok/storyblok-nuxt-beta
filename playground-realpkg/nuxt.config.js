import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  buildModules: [
    ["@storyblok/nuxt-beta", { accessToken: "OurklwV5XsDJTIE1NJaD2wtt" }]
  ],
  meta: {
    script: [{ src: "https://cdn.tailwindcss.com" }]
  }
});
