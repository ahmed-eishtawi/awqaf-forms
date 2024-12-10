/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */
import index from "@/pages/index.vue";
import examerView from "@/pages/examer-view.vue";
import studentView from "@/pages/student-view.vue";
import studentChoice from "@/pages/student-choice.vue";

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/examer-view",
    name: "examer-view",
    component: examerView,
  },
  {
    path: "/student-view",
    name: "student-view",
    component: studentView,
  },
  {
    path: "/student-choice/:id",
    name: "student-choice",
    component: studentChoice,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
