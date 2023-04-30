<script setup>
import { reactive } from "vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const user = reactive({
  username: "",
  password: "",
});

const userStore = useUserStore();

if (localStorage.getItem("user")) {
  router.push({ name: "home" });
}

const login = async (e) => {
  e.preventDefault();
  const res = await axios.post("http://localhost:3000/api/auth", {
    username: user.username,
    password: user.password,
  });
  localStorage.setItem("user", JSON.stringify(res.data));
  userStore.setUser(res.data);
  router.push({ name: "home" });
};
</script>

<template>
  <div class="flex w-full">
    <div
      class="mx-auto mt-14 bg-white max-w-md w-full rounded-xl py-2 flex flex-col shadow-lg"
    >
      <h1
        class="text-3xl w-full justify-center flex items-center font-bold h-36"
      >
        popbox
      </h1>
      <form class="mx-10 flex flex-col">
        <input
          v-model="user.username"
          type="text"
          id="username"
          placeholder="Tên người dùng"
          class="h-10 bg-gray-100 px-3 rounded-xl outline-none mb-3"
        />
        <input
          v-model="user.password"
          type="password"
          id="password"
          placeholder="Mật khẩu"
          class="h-10 bg-gray-100 px-3 rounded-xl outline-none"
        />
        <button
          @click="login"
          class="mt-6 h-10 bg-green-500 text-white font-medium rounded-xl"
        >
          Đăng nhập
        </button>
      </form>
      <a class="text-center my-3" href="#">Quên mật khẩu?</a>
      <hr class="mx-10" />
      <router-link
        :to="{ name: 'register' }"
        class="mt-6 mx-10 h-10 bg-black text-white flex items-center justify-center font-medium rounded-xl mb-10"
      >
        Tạo tài khoản mới
      </router-link>
    </div>
  </div>
  <Footer />
</template>
