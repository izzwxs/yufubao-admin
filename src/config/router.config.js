import { UserLayout } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: 'Home',
    meta: { title: '首页', icon: 'dashboard' }
  }
]

export const constantRouterMap = [
  {
    path: '/auth',
    name: 'Auth',
    component: UserLayout,
    redirect: '/auth/login',
    children: [
      {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  }
]
