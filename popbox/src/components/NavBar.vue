<script setup>
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import Avatar from "./Avatar.vue";
import { ref } from "vue";
const userStore = useUserStore();
import NavItem from "./NavItem.vue";
const expandNavBar = ref(false);
const expand = () => {
  expandNavBar.value = !expandNavBar.value;
};

const router = useRouter();

const logout = () => {
  userStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <nav class="border-r fixed h-screen w-16 lg:w-64 bg-white">
    <h1
      class="pl-4 text-3xl hidden w-full absolute lg:flex items-center top-0 h-20 font-bold"
    >
      popbox
    </h1>
    <ul
      class="absolute top-20 bottom-12 right-0 left-0 overflow-y-auto lg:px-2 flex flex-col items-center"
    >
      <NavItem>
        <router-link
          class="h-full w-full flex items-center justify-center lg:justify-start lg:px-2"
          :to="{ name: 'home' }"
        >
          <i class="ri-home-line ri-xl"></i>
          <span class="lg:inline hidden ml-2"> Trang chủ </span>
        </router-link>
      </NavItem>

      <NavItem @click="$emit('toggleSearch')">
        <div class="mx-2">
          <i class="ri-search-line ri-xl"></i>
          <span class="lg:inline hidden ml-2">Tìm kiếm </span>
        </div>
      </NavItem>

      <NavItem>
        <router-link
          class="h-full w-full flex items-center justify-center lg:justify-start lg:px-2"
          :to="{ name: 'chat' }"
        >
          <i class="ri-messenger-line ri-xl"></i>
          <span class="lg:inline hidden ml-2"> Chat </span>
        </router-link>
      </NavItem>

      <NavItem @click="$emit('toggleForm')">
        <div class="mx-2">
          <i class="ri-add-box-line ri-xl"></i>
          <span class="lg:inline hidden ml-2">Thêm</span>
        </div>
      </NavItem>

      <NavItem>
        <router-link
          class="h-full w-full flex items-center justify-center lg:justify-start lg:px-2"
          :to="`/u/${userStore.user.username}`"
        >
          <i class="ri-user-3-line ri-xl"></i>
          <!-- <Avatar :src="userStore.user.avatar_url" height="8" width="8" /> -->
          <span class="lg:inline hidden ml-2">
            {{ userStore.user.name }}
          </span>
        </router-link>
      </NavItem>
    </ul>
    <div
      v-if="expandNavBar"
      class="absolute bottom-20 right-0 left-0 flex p-2 mx-2 shadow-md rounded-xl border"
    >
      <ul>
        <li @click="logout" class="py-2">Đăng xuất</li>
      </ul>
    </div>
    <div
      class="absolute bottom-0 h-12 right-0 left-0 lg:px-2 mb-4 flex items-center"
    >
      <NavItem @click="expand">
        <div class="mx-2">
          <i class="ri-menu-line ri-xl"></i>
          <span class="lg:inline hidden ml-2"> Xem thêm </span>
        </div>
      </NavItem>
    </div>
  </nav>
</template>
