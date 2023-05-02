import { reactive } from "vue";
import { io } from "socket.io-client";
export const state = reactive({
  connected: false,
  posts: [],
});

export const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("load-post", (newPost) => {
  state.posts = newPost;
});
