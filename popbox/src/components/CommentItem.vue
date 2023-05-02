<script setup>
import Avatar from "./Avatar.vue";
const props = defineProps({
  comment: Object,
});
</script>

<template>
  <div class="mb-2 flex mx-2">
    <Avatar :src="comment.author.avatar_url" height="8" width="8" />

    <div class="bg-gray-100 ml-2 flex flex-col rounded-xl px-2 py-1">
      <span class="font-medium">{{ comment.author.name }}</span>
      <span>{{ comment.content }}</span>
    </div>
  </div>
</template>
