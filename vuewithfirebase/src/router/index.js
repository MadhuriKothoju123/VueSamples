import { createRouter, createWebHistory } from "vue-router";
import RegistrationView from "../views/UserRegister.vue";
import DashboardView from "../views/DashboardView.vue";
import { useAuthStore } from "../store/userRegister";
import AddVehicles from "../components/AddVehicles.vue";

const routes = [

  {
    path: "/register",
    name: "registration",
    component: RegistrationView,
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  },

  {
    path: "/addVehicle",
    name: "addVehicle",
    component: AddVehicles,
    meta: { requiresAuth: true }
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const AuthStore = useAuthStore();
  if (to.meta.requiresAuth && !AuthStore?.user) {
    next("/");
  }
  
  else {
    next();
  }
});
export default router;
