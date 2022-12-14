import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "default",
    component: () => 
      import("./components/DefaultView.vue")
  },
  {
    path: "/HallwayBlank",
    name: "HallwayBlank",
    component: () => 
      import("./components/DefaultView.vue")
  },
  {
    path: "/Hallway 2",
    name: "Hallway 2",
    component: () => 
      import("./components/DefaultView.vue")
  },
  {
    path: "/Hallway 3",
    name: "Hallway 3",
    component: () => 
      import("./components/DefaultView.vue")
  },
  {
    path: "/Food Court",
    name: "Food Court",
    component: () => 
      import("./components/DefaultView.vue")
  },
  {
    path: "/main_menu",
    name: "MainMenu",
    component: () => 
      import("./components/MainMenu.vue")
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
  },
  {
    path: "/order_confirmed",
    name: "OrderConfirmed",
    component: () => 
      import("./components/OrderConfirmed.vue")
  },
  {
    path: "/a",
    name: "a",
    component: () =>
      import("./components/DirectionalOverviewA.vue")
  }

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


export default router;
