import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import StoreInfoPage from "../views/StoreInfoPage.vue";
import ServicesPage from "../views/ServicesPage.vue";
import EmployeesPage from "../views/EmployeesPage.vue";
import BookingsPage from "../views/BookingsPage.vue";
import ReviewsPage from "../views/ReviewsPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Login", component: LoginPage },
  { path: "/store", name: "StoreInfo", component: StoreInfoPage },
  { path: "/services", name: "Services", component: ServicesPage },
  { path: "/employees", name: "Employees", component: EmployeesPage },
  { path: "/bookings", name: "Bookings", component: BookingsPage },
  { path: "/reviews", name: "Reviews", component: ReviewsPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
