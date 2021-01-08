import Vue from 'vue'
import VueRouter from 'vue-router'


const Home=() => import('@/views/Home.vue')
const Layout=()=>import('@/layout')
Vue.use(VueRouter)

 export  const constantRoutes = [

   {
     path: '/redirect',
     component: Layout,
     hidden: true,
     children: [
       {
         path: '/redirect/:path*',
         component: () => import('@/views/redirect/index')
       }
     ]
   },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
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

]

const createRouter = () => new VueRouter({
  // mode: 'history',
  //base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

/*const router = new VueRouter({
  mode: 'history',
  routes
})*/

export default router
