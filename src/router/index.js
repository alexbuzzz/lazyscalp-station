import { createRouter, createWebHistory } from 'vue-router'
import LargeLayout from '../views/LargeLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'large',
      component: LargeLayout,
    },
    {
      path: '/small',
      name: 'small',
      component: () => import('../views/SmallLayout.vue'),
    },
  ],
})

export default router
