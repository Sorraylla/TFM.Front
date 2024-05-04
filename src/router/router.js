import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login";
import Dashboard from "@/views/dashboard/MainView"

// Define las rutas de tu aplicación
const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Dashboard,
  }
];

// Crea la instancia del router con las rutas definidas
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
