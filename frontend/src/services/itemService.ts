import { api } from './api'
import type { Item, CreateItemDTO, UpdateItemDTO } from '@/types/item'

export const itemService = {
  // 获取所有项目
  getAll: async () => {
    console.log('Fetching all items...')
    return await api.get<Item[]>('/items')
  },
  
  // 获取单个项目
  getById: async (id: number) => {
    return await api.get<Item>(`/items/${id}`)
  },
  
  // 创建项目
  create: async (data: CreateItemDTO) => {
    return await api.post<Item>('/items', data)
  },
  
  // 更新项目
  update: async (id: number, data: UpdateItemDTO) => {
    return await api.put<Item>(`/items/${id}`, data)
  },
  
  // 删除项目
  delete: async (id: number) => {
    await api.delete(`/items/${id}`)
  }
} 