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
      path: '/about',
      name: 'about',
      component: () => import('../views/pages/About/AboutPage.vue')
    }
  ]
})

export default router
