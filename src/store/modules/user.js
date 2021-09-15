import storage from 'store2'
import { login, getInfo, logout } from '@/api/login'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: []
  },
  mutations: {
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
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data
            storage.set('Authorization', result.token, 7 * 24 * 60 * 60 * 1000)
            commit('SET_TOKEN', result.token)
            resolve(result)
          })
          .catch(error => reject(error))
      })
    },

    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const user = response.user

            const avatar =
              user.avatar === ''
                ? require('@/assets/images/avatar.jpg')
                : process.env.VUE_APP_API_BASE_URL + user.avatar
            if (response.roles && response.roles.length > 0) {
              commit('SET_ROLES', response.roles)
            } else {
              commit('SET_ROLES', ['ROLE_DEFAULT'])
            }
            commit('SET_NAME', user.nickName)
            commit('SET_AVATAR', avatar)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },

    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token).then(res => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove('Authorization')
          resolve(res)
        })
      })
    }
  }
}

export default user
