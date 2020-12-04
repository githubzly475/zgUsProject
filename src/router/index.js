import Vue from 'vue'
import VueRouter from 'vue-router'

import Log from '@/views/Log'
const Home=() => import('@/views/Home.vue')
const Layout=()=>import('@/layout')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Log',
    component: Log
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
  /*,
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: 'Home', icon: '' }
    }]
  }*/
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
