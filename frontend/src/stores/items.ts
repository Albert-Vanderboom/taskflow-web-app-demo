import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Item, CreateItemDTO, UpdateItemDTO } from '@/types/item'
import { itemService } from '@/services/itemService'

export const useItemStore = defineStore('items', () => {
  // 状态
  const items = ref<Item[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 获取所有项目
  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      const response = await itemService.getAll()
      items.value = response.data
    } catch (e) {
      error.value = 'Failed to fetch data'
      console.error('Failed to fetch items:', e)
      throw e 
    } finally {
      loading.value = false
    }
  }

  // 创建项目
  async function createItem(data: CreateItemDTO) {
    loading.value = true
    error.value = null
    try {
      const response = await itemService.create(data)
      const newItem = response.data
      items.value.unshift(newItem)
      return newItem
    } catch (e) {
      error.value = 'Failed to create'
      throw e
    } finally {
      loading.value = false
    }
  }

  // 更新项目
  async function updateItem(id: number, data: UpdateItemDTO) {
    loading.value = true
    error.value = null
    try {
      const response = await itemService.update(id, data)
      const updatedItem = response.data
      const index = items.value.findIndex(item => item.id === id)
      if (index !== -1) {
        items.value[index] = updatedItem
      }
      return updatedItem
    } catch (e) {
      error.value = 'Failed to update'
      throw e
    } finally {
      loading.value = false
    }
  }

  // 删除项目
  async function deleteItem(id: number) {
    loading.value = true
    error.value = null
    try {
      await itemService.delete(id)
      items.value = items.value.filter(item => item.id !== id)
    } catch (e) {
      error.value = 'Failed to delete'
      throw e
    } finally {
      loading.value = false
    }
  }

  // 获取单个项目
  async function getById(id: number) {
    loading.value = true
    error.value = null
    try {
      return await itemService.getById(id)
    } catch (e) {
      error.value = 'Failed to fetch item details'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    // 状态
    items,
    loading,
    error,
    // 操作方法
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    getById
  }
}) 