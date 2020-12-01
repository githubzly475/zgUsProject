import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: [],
  buttonPerms: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_BUTTONS: (state, buttonPerms) => {
    state.buttonPerms = buttonPerms
  }
}

const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      getRouters().then(res =>{
        const accessedRoutes = filterAsyncRouter(res.data.menuRouters)
        const buttonPerms = res.data.buttonPerms
        accessedRoutes.push(notFoundRouter)
        commit('SET_ROUTES', accessedRoutes)
        commit('SET_BUTTONS', buttonPerms)
        resolve(accessedRoutes)
      })
    })
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
