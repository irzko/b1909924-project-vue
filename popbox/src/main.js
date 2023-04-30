import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import "remixicon/fonts/remixicon.css";
import ResizeTextarea from "resize-textarea-vue3";
const pinia = createPinia();

createApp(App).use(router).use(pinia).use(ResizeTextarea).mount("#app");
