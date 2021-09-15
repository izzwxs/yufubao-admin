import router from './router'
import store from './store'
import storage from 'store2'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'

const allowList = ['Login']
const loginRoutePath = '/auth/login'
const defaultRoutePath = '/'

router.beforeEach((to, form, next) => {
  NProgress.start()
  if (storage.get('Authorization')) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.roles
          store
            .dispatch('GenerateRoutes', { roles })
            .then(() => {
              store.getters.addRouters.forEach(element => {
                router.addRoute(element)
              })
              next({ ...to, replace: true })
            })
            .catch(() => {
              store.dispatch('Logout').then(() => {
                router.push({ name: 'Login' })
              })
            })
        })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      next() // 在免登录名单，直接进入
    } else {
      next({ path: loginRoutePath })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
