import { createRouter, createWebHistory } from "vue-router";
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
