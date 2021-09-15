import axios from 'axios'
import storage from 'store2'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // API 请求的默认前缀
  timeout: 6000 // 请求超时时间
})

const errorHandler = error => {
  return Promise.reject(error)
}

service.interceptors.request.use(config => {
  // 让每个请求携带自定义
  const token = storage.get('Authorization')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, errorHandler)

service.interceptors.response.use(response => {
  return response.data
}, errorHandler)

export default service
