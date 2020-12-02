import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create(
  {
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
  }
)

service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const code = response.data.code
    // if the custom code is not 200, it is judged as an error.
    if (code === 4003) {
      MessageBox.alert(
        '登录状态已过期，请重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (code !== 200){
      console.log('res',res)
      Notification.error({
        title: res.msg
      })
      return Promise.reject(res.msg || 'Error')
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else {
      return res
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    if (code === 504) {
      Notification.error({
        title: '服务器异常',
        duration: 2500
      })
      return Promise.reject(error)
    }
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，请重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else {
      // const errorMsg = error.response.data.message
      // if (errorMsg !== undefined) {
      Notification.error({
        title: "未知异常，请联系管理员",
        duration: 2500
      })
      // }
    }
    return Promise.reject(error)
  }
)

export default service



