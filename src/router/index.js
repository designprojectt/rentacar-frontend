import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/pages/Home/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/pages/Login/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/pages/Register/RegisterPage.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/pages/About/AboutPage.vue')
    }
  ]
})

export default router
