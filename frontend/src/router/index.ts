import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'Authentification',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/events',
      name: 'Event Overview',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/event/:id',
      name: 'Event Detail',
      component: () => import('../views/EventView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
