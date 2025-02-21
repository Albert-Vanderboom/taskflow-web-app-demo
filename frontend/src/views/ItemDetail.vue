<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Item } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'
import { ArrowLeft, Edit, Delete } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()

// 项目数据
const item = ref<Item | null>(null)
const loading = ref(true)

// 获取项目详情
const fetchItem = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    ElMessage.error(messages.error.invalidId)
    router.push('/items')
    return
  }

  loading.value = true
  try {
    const response = await itemStore.getById(id)
    item.value = response.data
  } catch (e) {
    ElMessage.error(messages.error.load)
    router.push('/items')
  } finally {
    loading.value = false
  }
}

// 编辑项目
const handleEdit = () => {
  if (item.value) {
    router.push(`/items/${item.value.id}/edit`)
  }
}

// 返回列表
const handleBack = () => {
  router.push('/items')
}

// 删除项目
const handleDelete = async () => {
  if (!item.value) return

  try {
    await ElMessageBox.confirm(
      messages.confirm.delete,
      messages.confirm.deleteTitle,
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    await itemStore.deleteItem(item.value.id)
    ElMessage.success(messages.success.delete)
    router.push('/items')
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error(messages.error.delete)
    }
  }
}

onMounted(() => {
  fetchItem()
})

// 更新消息文本
const messages = {
  error: {
    load: 'Failed to load task details',
    delete: 'Failed to delete task',
    invalidId: 'Invalid task ID'
  },
  success: {
    delete: 'Task deleted successfully'
  },
  confirm: {
    delete: 'Are you sure you want to delete this task?',
    deleteTitle: 'Confirm Delete'
  }
}
</script>

<template>
  <PageContainer title="Task Details">
    <template #actions>
      <div class="actions">
        <el-button @click="handleBack">
          <el-icon><ArrowLeft /></el-icon>
          Back
        </el-button>
        <el-button 
          type="primary" 
          @click="handleEdit"
          v-if="item"
        >
          <el-icon><Edit /></el-icon>
          Edit
        </el-button>
        <el-button 
          type="danger" 
          @click="handleDelete"
          v-if="item"
        >
          <el-icon><Delete /></el-icon>
          Delete
        </el-button>
      </div>
    </template>

    <div class="detail-container" v-loading="loading">
      <el-descriptions 
        v-if="item" 
        :column="1" 
        border
        class="descriptions"
      >
        <el-descriptions-item label="ID">
          <span class="id-badge">{{ item.id }}</span>
        </el-descriptions-item>
        
        <el-descriptions-item label="Title">
          <span class="title">{{ item.title }}</span>
        </el-descriptions-item>
        
        <el-descriptions-item label="Description">
          <div class="description">
            {{ item.description || 'No description provided' }}
          </div>
        </el-descriptions-item>
        
        <el-descriptions-item label="Created">
          <span class="date">
            {{ new Date(item.created_at).toLocaleString() }}
          </span>
        </el-descriptions-item>
        
        <el-descriptions-item label="Last Updated">
          <span class="date">
            {{ new Date(item.updated_at).toLocaleString() }}
          </span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </PageContainer>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.actions {
  display: flex;
  gap: 12px;
}

.descriptions {
  width: 100%;
}

:deep(.el-descriptions__label) {
  font-weight: 500;
  width: 120px;
}

.id-badge {
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: #2B3A67;
}

.description {
  white-space: pre-wrap;
  line-height: 1.6;
  color: #666;
}

.date {
  color: #666;
  font-size: 14px;
}
</style> 