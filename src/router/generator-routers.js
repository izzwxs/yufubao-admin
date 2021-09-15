import { getRouters } from '@/api/login'
import { BasicLayout, RouteView, UserLayout } from '@/layouts'
import { asyncRouterMap } from '@/config/router.config'

// 前端路由表
const constantRouterComponents = {
  BasicLayout: BasicLayout,
  RouteView: RouteView,
  UserLayout: UserLayout,

  Home: () => import('@/views/Home')
}

const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}

const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/',
  meta: { title: '首页' },
  children: []
}

export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    getRouters()
      .then(res => {
        const menuNav = []
        rootRouter.children = asyncRouterMap.concat(res.data)
        menuNav.push(rootRouter)
        const routers = generator(menuNav)
        routers.push(notFoundRouter)
        resolve(routers)
      })
      .catch(err => reject(err))
  })
}

export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    if (
      item.children &&
      item.children.length === 1 &&
      !(item.children.children && item.children.children.length > 0) &&
      !item.alwaysShow
    ) {
      parent = undefined
      item = item.children[0]
      item.children = []
    }
    const { title, icon, noCache } = item.meta || {}
    if (item.component) {
      if (item.component === 'Layout') {
        item.component = 'RouteView'
      } else if (item.component === 'ParentView') {
        item.component = 'RouteView'
        item.path = '/' + item.path
      }
    }
    if (item.isFrame === 0) {
      item.target = '_blank'
    }
    const tableContents = String(item.component).startsWith('system')
      ? constantRouterComponents[item.component || item.key] ||
        (resolve => require([`@/views/${item.component}`], resolve))
      : constantRouterComponents[item.component || item.key] ||
        (resolve => require([`@/pages/${item.component}`], resolve))

    // (() => import(`@/pages/${item.component}`))

    const currentRouter = {
      path: item.path || `${(parent && parent.path) || ''}/${item.path}`,
      name: item.name || item.key || '',
      component: tableContents,
      hidden: item.hidden,
      meta: {
        title: title,
        icon: icon || undefined,
        target: '',
        permission: item.name,
        keepAlive: !noCache
      },
      redirect: item.redirect
    }
    if (!constantRouterComponents[item.component || item.key]) {
      currentRouter.path = `${(parent && parent.path) || ''}/${item.path}`
    }
    if (item.children && item.children.length > 0) {
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}
