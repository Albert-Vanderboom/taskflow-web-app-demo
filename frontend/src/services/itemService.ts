import { api } from './api'
import type { Item, CreateItemDTO, UpdateItemDTO } from '@/types/item'

export const itemService = {
  // 获取所有项目
  getAll: () => api.get<Item[]>('/items'),
  
  // 获取单个项目
  getById: (id: number) => api.get<Item>(`/items/${id}`),
  
  // 创建项目
  create: (data: CreateItemDTO) => api.post<Item>('/items', data),
  
  // 更新项目
  update: (id: number, data: UpdateItemDTO) => 
    api.put<Item>(`/items/${id}`, data),
  
  // 删除项目
  delete: (id: number) => api.delete(`/items/${id}`)
} 