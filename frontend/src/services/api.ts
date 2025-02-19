import axios from 'axios'
import type { AxiosInstance } from 'axios'

// 创建 axios 实例
export const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 响应拦截器 - 直接返回响应数据
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // 统一错误处理
    const message = error.response?.data?.detail || '请求失败'
    // 这里可以使用 Element Plus 的消息提示
    console.error(message)
    return Promise.reject(error)
  }
) 