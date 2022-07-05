import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/webstack',
  },
  {
    path: '/webstack',
    component: () => import('@/layout/webstack/index.vue'),
  },
]

export default createRouter({
  history: createWebHistory('website-nav'),
  routes,
})
