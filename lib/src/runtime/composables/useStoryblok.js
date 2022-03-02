import { onMounted } from "vue";
import { useState } from "#app";

export default async (slug, apiOptions = {}, bridgeOptions = {}) => {
  const storyblokApi = useStoryblokApi(apiOptions);
  if (!storyblokApi)
    return console.error(
      "useStoryblok cannot be used if you disabled useApiClient when adding @storyblok/nuxt-beta to your nuxt.config.js"
    );

  const story = useState("story", () => null);

  onMounted(() => {
    if (story.value && story.value.id) {
      useStoryblokBridge(
        story.value.id,
        (evStory) => (story.value = evStory),
        bridgeOptions
      );
    }
  });

  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, apiOptions);
  story.value = data.story;

  return story;
};
