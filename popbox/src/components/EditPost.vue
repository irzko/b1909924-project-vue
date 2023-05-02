<script setup>
import Avatar from "./Avatar.vue";
const emit = defineEmits(["toggleForm"]);
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/user";
import axios from "axios";
import { socket } from "../socket";
const userStore = useUserStore();
const textValue = ref("");

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  tg: {
    type: Function,
    required: true,
  },
});

const selectedFile = reactive({
  file: null,
  uri: null,
});
textValue.value = props.post.content;
selectedFile.uri = props.post.file_url;

const changeHandler = (e) => {
  selectedFile.file = e.target.files[0];
  selectedFile.uri = window.URL.createObjectURL(e.target.files[0]);
};

const handleSubmit = () => {
  axios
    .post(`http://localhost:3000/api/post/update`, {
      postId: props.post._id,
      content: textValue.value,
    })
    .then(() => {
      props.tg();
      socket.emit("create-post");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div
    class="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex justify-center items-center"
  >
    <form
      class="w-[31.25rem] relative bg-white backdrop-blur-md rounded-3xl px-4 flex flex-col justify-between"
    >
      <div>
        <div>
          <div class="flex relative justify-center py-3 items-center">
            <div class="font-medium">Chỉnh sửa bài viết</div>
            <button
              class="absolute right-0 bg-gray-200 flex justify-center items-center w-8 h-8 rounded-full"
              @click="tg"
            >
              <i class="ri-close-line ri-xl"></i>
            </button>
          </div>
          <div class="flex items-center">
            <Avatar
              :src="userStore.user.avatar_url"
              :alt="userStore.user.name"
              className="mr-2"
            />
            <span class="font-medium">{{ userStore.user.name }}</span>
          </div>
        </div>
        <div class="overflow-y-auto h-80">
          <resize-textarea
            class="w-full min-h-[2rem] focus:outline-none overflow-y-hidden resize-none p-2 placeholder:text-black/80"
            placeholder="Bạn đang nghĩ gì thế?"
            v-model="textValue"
          ></resize-textarea>
          <img
            class="rounded-xl"
            v-if="selectedFile.uri"
            :src="selectedFile.uri"
            height="468"
            width="468"
            alt="file"
          />
          <div class="h-1"></div>
        </div>
      </div>
      <div>
        <div class="flex mt-2 flex-col">
          <div class="flex">
            <label
              htmlFor="file-upload"
              class="h-14 w-14 mr-2 mb-5 rounded-xl bg-gray-200 flex justify-center items-center"
            >
              <i class="ri-image-add-line ri-xl"></i>
            </label>
            <input
              id="file-upload"
              type="file"
              class="hidden"
              name="file"
              @change="changeHandler"
            />
          </div>
        </div>
        <button
          @click.prevent="handleSubmit"
          class="bg-black text-white font-medium w-full py-2 mb-4 rounded-full"
        >
          Đăng
        </button>
      </div>
    </form>
  </div>
</template>
