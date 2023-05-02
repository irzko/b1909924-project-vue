import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Register from "../views/Register.vue";
import MainLayout from "../components/MainLayout.vue";

const routes = [
  {
    name: "layout",
    path: "/",
    component: MainLayout,
    children: [
      {
        name: "home",
        path: "/",
        component: Home,
      },
      {
        name: "chat",
        path: "/chat",
        component: Chat,
      },
      {
        path: "/u/:username",
        component: Profile,
      },
    ],
  },

  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
