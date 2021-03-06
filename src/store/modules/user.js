import { login, logout, getInfo } from '@/customeraxios/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {

    const { username, password, t, code, token } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, code:code, t:t, token:token}).then(response => {
        const { tokenHead,tokenValue } = response.data
        const tokenStr = tokenHead + tokenValue
        commit('SET_TOKEN', tokenStr)
        setToken(tokenStr)
        resolve()
        console.log('333333')
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
     // debugger
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('认证失败，请重新登录！')
        }

        const { roles, name, avatar } = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('获取用户权限失败，请稍后重试！')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

