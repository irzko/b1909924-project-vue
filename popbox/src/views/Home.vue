<script setup>
import { ref, onMounted } from "vue";
const posts = ref();
import PostCard from "../components/PostCard.vue";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
import axios from "axios";
import { state } from "../socket";
axios.get("http://localhost:3000/api/post").then((res) => {
  state.posts = res.data;
});

// onMounted(() => {

// });
</script>

<template>
  <div class="max-w-lg mx-auto">
    <PostCard
      v-if="state.posts"
      v-for="post in state.posts"
      :post="post"
      :key="post._id"
    />
  </div>
</template>
