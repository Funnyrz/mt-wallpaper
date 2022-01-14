import { createRouter, createWebHistory } from "vue-router";
import Index from "@/components/Index.vue";
import Download from "@/components/Download.vue";

const routes = [
  {
    path: "/index",
    name: "Index",
    component: Index,
  },
  {
    path: "/download",
    name: "Download",
    component: Download,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
