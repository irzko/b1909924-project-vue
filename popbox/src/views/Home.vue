<script setup>
import PostCard from "../components/PostCard.vue";
import axios from "axios";
import { state } from "../socket";
import { ref } from "vue";
axios.get("http://localhost:3000/api/post").then((res) => {
  state.posts = res.data;
});

const showEditForm = ref(false);
const toggleEditForm = () => {
  showEditForm.value = !showEditForm.value;
};
</script>

<template>
  <div class="max-w-lg mx-auto">
    <PostCard
      v-if="state.posts"
      v-for="post in state.posts"
      :post="post"
      :key="post._id"
      :tg="toggleEditForm"
      :sef="showEditForm"
    />
  </div>
</template>
