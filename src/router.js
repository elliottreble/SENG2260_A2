import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "default",
    component: () => 
      import("./components/DefaultView.vue")
  },
  {
    path: "/restaurant_list",
    name: "RestaurantList",
    //component: Register,
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./components/RestaurantList.vue"),
  },
  {
    path: "/restaurant_map",
    name: "RestaurantMap",
    //component: Register,
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "./components/RestaurantMap.vue"),
  },
  {
    path: "/menu/:restaurant",
    name: "menu",
    component: () =>
      import("./components/Menu.vue")
  },
  {
    path: "/cart",
    name: "cart",
    component: () => 
      import("./components/Cart.vue")
  }

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
