// Composables
import { checkToken } from "@/api/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Login.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard to check if a route requires authentication
router.beforeEach(async (to, from, next) => {
  console.log(to);
  if (to.meta.requiresAuth) {
    let token = localStorage.getItem("token");
    if (!token) {
      next("/");
    }
    let isValidTokenResponse = await checkToken(token);
    if (isValidTokenResponse.status === 200) {
      next();
    } else {
      next("/");
    }
  } else {
    console.log("aqa");
    next();
  }
});

export default router;
