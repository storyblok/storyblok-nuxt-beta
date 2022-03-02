<script setup>
const story = useStoryblok("vue/test", { version: "draft" });
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
