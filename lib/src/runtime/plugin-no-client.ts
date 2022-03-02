import { StoryblokVue } from "@storyblok/vue";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";

export default defineNuxtPlugin(({ vueApp }) => {
  const { storyblok } = useRuntimeConfig();
  vueApp.use(StoryblokVue, { ...storyblok });
});
