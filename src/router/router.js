import LogIn from '@/components/LogIn'
import SignalPage from '@/components/SignalPage'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signal-page',
    name: 'SignalPage',
    component: SignalPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
