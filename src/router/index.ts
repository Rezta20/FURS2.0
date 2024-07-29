import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CustomersPage from "../views/CustomersPage.vue";
import CustomerPage from "../views/CustomerPage.vue";
import LoginPage from "../views/LoginPage.vue";
import StoreInfoPage from "../views/StoreInfoPage.vue";
import ServicesPage from "../views/ServicesPage.vue";
import EmployeesPage from "../views/EmployeesPage.vue";
import OrdersPage from "../views/OrdersPage.vue";
import OrderPage from "../views/OrderPage.vue";
import ReviewsPage from "../views/ReviewsPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/customers", name: "Customers", component: CustomersPage },
  { path: "/customers/new", name: "Customer", component: CustomerPage },
  { path: "/", name: "Login", component: LoginPage },
  { path: "/store", name: "StoreInfo", component: StoreInfoPage },
  { path: "/services", name: "Services", component: ServicesPage },
  { path: "/employees", name: "Employees", component: EmployeesPage },
  { path: "/orders", name: "Orders", component: OrdersPage },
  { path: "/orders/createOrder", name: "Order", component: OrderPage },
  { path: "/reviews", name: "Reviews", component: ReviewsPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
