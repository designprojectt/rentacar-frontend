import { createRouter, createWebHistory } from 'vue-router'
import {nextTick} from "vue";
import {userProfile} from "@/services/modules/jwt.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: "Rent a Car | Home"
      },
      component: () => import('../views/pages/Home/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: "Rent a Car | Login"
      },
      component: () => import('../views/pages/Login/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: "Rent a Car | Register"
      },
      component: () => import('../views/pages/Register/RegisterPage.vue')
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      meta: {
        title: "Rent a Car | Verify Mail"
      },
      component: () => import('../views/pages/VerifyMail/VerifyEmail.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: "Rent a Car | About"
      },
      component: () => import('../views/pages/About/AboutPage.vue')
    },
    {
      path: '/my-vehicles',
      name: 'my-vehicles',
      meta: {
        title: "Rent a Car | My Vehicles",
        auth: true
      },
      component: () => import('../views/pages/MyVehicles/MyVehicles.vue')
    },
    {
      path: '/my-rents',
      name: 'my-rents',
      meta: {
        title: "Rent a Car | My Rents",
        auth: true,
      },
      component: () => import('../views/pages/MyRents/MyRents.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.auth && userProfile() === null) {
    return "/login";
  }
});

router.afterEach((to, from) => {
  nextTick(() => {
    document.title = to.meta.title || "Rent a Car";
  });
})

export default router
