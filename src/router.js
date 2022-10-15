import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Main from "../layouts/main/Main.vue";
import Register from "../views/Register.vue";
import { getAuth } from "firebase/auth";
import Daily from "../views/Daily.vue";
import Dashboard from "../views/Dashboard.vue";

export const sideMenuRoutes = [
  {
    path: 'side-menu',
    component: () => import('../components/SideMenu.vue')
  },
]

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    //component: Register,
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ResetPassword.vue"),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: {
      authRequired: true
    }
  },
  {
    path: '/dashboard/daily/:date',
    name: 'Daily',
    component: Daily
  },
  {
    path: '/patients',
    name: 'Patients',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Patients.vue'),
    children: sideMenuRoutes

  },
  {
    path: '/professionals',
    name: 'Professionals',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Professionals.vue'),
    children: sideMenuRoutes

  },
  {
    path: '/patient/:id',
    name: 'Patient',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/PatientSummary.vue'),
    children: sideMenuRoutes

  },
  {
    path: '/dashboard-main',
    name: 'DashboardMain',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/DashboardMain.vue'),
    children: sideMenuRoutes
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Profile.vue'),
    meta: {
      authRequired: true
    }
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    const auth = getAuth();
    console.log(auth);
    if (!!auth.currentUser) {
      next();
    }
    else if (window.location.href.includes("localhost")) {
      console.log("debug mode routing overloaded");
      next();
    }
    else {
      alert('You must be logged in to see this page');
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
});

export default router;
