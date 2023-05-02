<script setup>
import axios from "axios";
import { ref, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";
import Avatar from "../components/Avatar.vue";
import PostCard from "../components/PostCard.vue";
const router = useRoute();
const user = ref({});
const posts = ref([]);

watchEffect(() => {
  axios
    .get("http://localhost:3000/api/users/profile/" + router.params.username)
    .then((response) => {
      user.value = response.data;
      if (user.value._id) {
        axios
          .get("http://localhost:3000/api/post/" + user.value._id)
          .then((response) => {
            posts.value = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div class="flex max-w-2xl p-4 mx-auto rounded-xl items-center mt-8 bg-white">
    <div class="w-56 flex justify-center">
      <Avatar :src="user.avatar_url" height="32" width="32" />
    </div>
    <div>
      <h1 class="text-2xl font-medium">{{ user.name }}</h1>
      <p class="text-gray-500">@{{ user.username }}</p>
      <span>{{ posts.length }} bài viết</span>
    </div>
  </div>
  <div class="max-w-lg mx-auto">
    <PostCard v-if="posts" v-for="post in posts" :post="post" :key="post._id" />
  </div>
</template>
