<script setup>
import axios from "axios";
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
import { socket } from "../socket";
import EditPost from "./EditPost.vue";
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  toggleOption: {
    type: Function,
    required: true,
  },
  tg: {
    type: Function,
    required: true,
  },
  sef: {
    type: Boolean,
    required: true,
  },
});
const deletePost = () => {
  axios
    .delete("http://localhost:3000/api/post/" + props.post._id)
    .then((res) => {
      socket.emit("delete-post");
      props.toggleOption();
    });
};


const handleEdit = () => {
  props.tg();
  // props.toggleOption();
};
</script>

<template>
  <div
    class="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
  >
    <div class="flex flex-col right-0 border bg-white rounded-2xl w-96 z-30">
      <ul v-if="userStore.user._id === post.author._id">
        <li @click="handleEdit" class="flex py-3 items-center justify-center cursor-pointer">
          <span class="ml-2 font-medium">Chỉnh sửa bài viết</span>
        </li>
        <hr />
        <li
          @click="deletePost"
          class="flex py-3 items-center justify-center cursor-pointer"
        >
          <span class="ml-2 font-medium">Xoá bài viết</span>
        </li>
        <hr />
      </ul>
      <ul>
        <li class="flex py-3 items-center justify-center cursor-pointer">
          <span class="ml-2 font-medium">Ẩn bài viêt</span>
        </li>
        <hr />

        <li class="flex py-3 items-center justify-center cursor-pointer">
          <span class="ml-2 font-medium">Báo cáo bài viết này</span>
        </li>
        <hr />
        <li
          @click="toggleOption"
          class="flex py-3 items-center justify-center cursor-pointer"
        >
          <span class="ml-2 font-medium">Huỷ</span>
        </li>
      </ul>
    </div>
  </div>
  <EditPost :post="post" :tg="tg" v-if="sef" />
</template>
