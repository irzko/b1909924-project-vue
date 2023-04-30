<script setup>
import NavBar from "./NavBar.vue";
import CreatePostForm from "./CreatePostForm.vue";
import Search from "./Search.vue";
import { ref } from "vue";
const isVisible = ref(false);
const showSearch = ref(false);

const toggleForm = () => {
  isVisible.value = !isVisible.value;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};
</script>

<template>
  <div class="relative">
    <NavBar @toggle-form="toggleForm" @toggle-search="toggleSearch" />
    <div class="absolute top-0 right-0 lg:left-64 left-16">
      <router-view></router-view>
    </div>
  </div>
  <Search v-if="showSearch" />
  <CreatePostForm @toggle-form="toggleForm" v-if="isVisible" />
</template>
