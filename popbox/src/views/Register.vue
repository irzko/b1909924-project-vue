<script setup>
import * as yup from "yup";
import axois from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";
import { reactive } from "vue";
import Footer from "../components/Footer.vue";

if (localStorage.getItem("user")) {
  router.push({ name: "home" });
}
const state = reactive({
  email: "",
  name: "",
  username: "",
  password: "",
});

const contactFormSchema = yup.object().shape({
  name: yup.string().required("Tên phải có giá trị."),
  email: yup
    .string()
    .email("E-mail không hợp lệ.")
    .max(50, "E-mail tối đa 50 ký tự.")
    .required("E-mail phải có giá trị."),
  username: yup.string().min(5, "Tên người dùng phải ít nhất 5 ký tự."),
  password: yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự."),
});

const register = async (e) => {
  e.preventDefault();
  // console.log(state);
  const res = await axois.post(
    "http://localhost:3000/api/users/register",
    state
  );
  console.log(res.data);
};
</script>

<template>
  <div class="flex w-full">
    <div
      class="mx-auto mt-14 bg-white max-w-md w-full rounded-xl py-2 flex flex-col shadow-lg"
    >
      <h1
        class="text-3xl w-full justify-center flex items-center font-bold h-20"
      >
        popbox
      </h1>
      <p class="text-center mb-10">Đăng ký để xem ảnh và video từ bạn bè.</p>
      <Form class="mx-10 flex flex-col" :validation-schema="contactFormSchema">
        <div class="form-group">
          <Field
            name="email"
            type="text"
            placeholder="Email"
            class="h-10 bg-gray-100 px-3 rounded-xl w-full outline-none"
            v-model="state.email"
          />
          <ErrorMessage name="email" class="text-red-500 text-xs" />
        </div>
        <div class="form-group mt-3">
          <Field
            name="name"
            type="text"
            placeholder="Họ tên đầy đủ"
            class="h-10 bg-gray-100 px-3 rounded-xl w-full outline-none"
            v-model="state.name"
          />
          <ErrorMessage name="name" class="text-red-500 text-xs" />
        </div>
        <div class="form-group mt-3">
          <Field
            name="username"
            type="text"
            placeholder="Tên người dùng"
            class="h-10 bg-gray-100 px-3 rounded-xl w-full outline-none"
            v-model="state.username"
          />
          <ErrorMessage name="username" class="text-red-500 text-xs" />
        </div>
        <div class="form-group mt-3">
          <Field
            name="password"
            type="text"
            placeholder="Mật khẩu"
            class="h-10 bg-gray-100 px-3 rounded-xl w-full outline-none"
            v-model="state.password"
          />
          <ErrorMessage name="password" class="text-red-500 text-xs" />
        </div>
        <p class="mt-10 text-xs">
          Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền riêng
          tư và Chính sách cookie của chúng tôi.
        </p>
        <button
          @click="register"
          class="mt-6 h-10 bg-green-500 text-white font-medium rounded-xl"
        >
          Đăng ký
        </button>
      </Form>
      <router-link class="text-center my-7" :to="{ name: 'login' }">
        Bạn đã có tài khoản?
      </router-link>
    </div>
  </div>
  <Footer />
</template>
