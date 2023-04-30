<script setup>
import { onMounted } from "vue";
import { useUserStore } from "./stores/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userStore.setUser(user);
  } else {
    router.push({ name: "login" });
  }
});
</script>

<template>
  <router-view></router-view>
</template>
