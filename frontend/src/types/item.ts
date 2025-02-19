export interface Item {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
}

export interface CreateItemDTO {
  title: string
  description: string
}

export interface UpdateItemDTO {
  title?: string
  description?: string
} 