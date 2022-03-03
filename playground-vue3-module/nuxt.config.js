import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  buildModules: [
    ["~/modules/module.js", { accessToken: "OurklwV5XsDJTIE1NJaD2wtt" }]
  ],
  meta: {
    script: [{ src: "https://cdn.tailwindcss.com" }]
  }
  // components: {
  //   global: true,
  //   dirs: ["~/components/storyblok"]
  // }
});
