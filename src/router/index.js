import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("views/home/Home");
const Category = () => import("views/category/Category");
const Cart = () => import("views/cart/Cart");
const Profile = () => import("views/profile/Profile");
const Detail = () => import("views/detail/Detail");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "home",
    id: 0,
    path: "/home",
    component: Home,
    meta: {
      showMainTabBar: true,
    },
  },
  {
    name: "category",
    id: 1,
    path: "/category",
    component: Category,
    meta: {
      showMainTabBar: true,
    },
  },
  {
    name: "cart",
    id: 2,
    path: "/cart",
    component: Cart,
    meta: {
      showMainTabBar: true,
      showLeft: false,
    },
  },
  {
    name: "profile",
    id: 3,
    path: "/profile",
    component: Profile,
    meta: {
      showMainTabBar: true,
    },
  },
  {
    path: "/detail/:iid",
    component: Detail,
    meta: {
      showLeft: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
