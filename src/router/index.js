import { createRouter, createWebHistory } from "vue-router/auto";
import index from "@/pages/index.vue";
import examerView from "@/pages/examer-view.vue";
import studentView from "@/pages/student-view.vue";
import studentChoice from "@/pages/student-choice.vue";
/* stores */
import useFormsStore from "@/stores/useFormsStore.js";
import Dashboard from "@/pages/dashboard.vue";

/* app routes */
const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
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
  {
    path: "/:catchAll(.*)",
    redirect: { name: "index" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Route guard
router.beforeEach((to, from, next) => {
  /* initilaize the forms store */
  const form_store = useFormsStore();

  //
  if (from.name === "student-view" && to.name !== "student-view") {
    return next(false);
  }

  if (from.name === "student-choice" && from.name !== to.name) {
    form_store.chooseAnotherStudent();
  }

  next();
});

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
