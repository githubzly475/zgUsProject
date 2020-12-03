import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import '@/icons' // icon
import '@/permission' // permission control
import auth from "./directive/permission/index" // permission

// handle vue-router error Uncaught (in promise)
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(auth)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.config.devtools = false;
new Vue({
  components: {App}, // 映射组件标签
  template: '<App/>', // 指定需要渲染到页面的模板
  router,
  store,
  render: h => h(App)
}).$mount('#app')
