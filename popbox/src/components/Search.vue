<script setup>
import { ref } from "vue";
const searchValue = ref("");
const searchResult = ref([]);
import axios from "axios";
import Avatar from "./Avatar.vue";
const search = () => {
  axios
    .get(`http://localhost:3000/api/search/${searchValue.value}`)
    .then((res) => {
      searchResult.value = res.data;
    });
};
</script>

<template>
  <div class="fixed bg-white left-16 lg:left-64 w-96 top-0 bottom-0 border-r">
    <h2 class="w-full text-2xl font-medium p-4">Tìm kiếm</h2>
    <div class="w-full px-2">
      <input
        @keyup.enter="search"
        class="bg-gray-100 outline-none w-full h-10 rounded-xl px-2"
        @input="(event) => (searchValue = event.target.value)"
        :value="searchValue"
        placeholder="Tìm kiếm"
      />
    </div>
    <hr class="my-6" />
    <ul>
      <li v-for="result in searchResult" :key="result._id">
        <router-link
          class="flex items-center my-2 px-2"
          :to="`/u/${result.username}`"
        >
          <Avatar :src="result.avatar_url" />
          <span class="ml-2">
            {{ result.name }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
