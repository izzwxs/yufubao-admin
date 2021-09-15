import request from '@/utils/request'

const AUTH_URL = process.env.VUE_APP_API_AUTH_URL

export function login(parameter) {
  return request({
    url: `${AUTH_URL}/login`,
    method: 'post',
    data: parameter
  })
}

export function logout() {
  return request({
    url: `${AUTH_URL}/logout`,
    method: 'post'
  })
}

export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

export function getRouters() {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}
