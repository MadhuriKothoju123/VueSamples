
import RegistrationView from "../views/UserRegister.vue";
import DashboardView from "../views/DashboardView.vue";
import AddVehicles from "../components/AddVehicles.vue";


export const routes = [

    {
      path: "/register",
      name: "registration",
      component: () => import("../../views/UserRegister.vue"),
    },
    {
      path: "/",
      name: "login",
      component: () => import("../../views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: ()=>import("../../views/DashboardView.vue"),
      meta: { requiresAuth: true }
    },
    // {
    //            path: "/vehiclesList",
    //            name: "vehicleList",
    //         component: ()=>import("../../views/DashboardView.vue"),
    //         meta: { requiresAuth: true }
    
    // },
  
    {
      path: "/addVehicle",
      name: "addVehicle",
      component: AddVehicles,
      meta: { requiresAuth: true }
    },
  ];