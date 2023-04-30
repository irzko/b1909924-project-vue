<script setup>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
import NavItem from "./NavItem.vue";
</script>

<template>
  <nav class="border-r fixed h-screen w-16 lg:w-64 bg-white">
    <h1
      class="pl-4 text-3xl hidden w-full absolute lg:flex items-center top-0 h-20 font-bold"
    >
      popbox
    </h1>
    <ul
      class="absolute top-20 bottom-0 right-0 left-0 overflow-y-auto lg:px-2 flex flex-col items-center"
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
        <div class="mx-2">
          <i class="ri-user-3-line ri-xl"></i>
          <span class="lg:inline hidden ml-2">
            {{ userStore.user.name }}
          </span>
        </div>
      </NavItem>
    </ul>
  </nav>
</template>
