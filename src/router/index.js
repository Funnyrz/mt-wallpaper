import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Index from "@/components/Index.vue";

const routes = [
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "",
    redirect: "/index",
  },
];

const router = createRouter({
  history: process.env.IS_ELECTRON
    ? createWebHashHistory(process.env.BASE_URL)
    : createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
