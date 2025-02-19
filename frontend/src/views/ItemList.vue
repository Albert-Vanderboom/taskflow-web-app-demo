<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Item } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'
import { Plus, View, Edit, Delete } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const itemStore = useItemStore()

const error = ref<string | null>(null)

// 加载数据
const loadData = async () => {
  error.value = null
  try {
    await itemStore.fetchItems()
  } catch (err) {
    error.value = '加载数据失败，请刷新页面重试'
    console.error('Failed to load items:', err)
  }
}

// 监听路由变化
watch(
  () => route.fullPath,
  (newPath) => {
    console.log('Route changed:', newPath)
    if (route.name === 'items') {
      loadData()
    }
  }
)

// 组件挂载时加载数据
onMounted(() => {
  console.log('Component mounted')
  loadData()
})

// 查看详情
const handleView = (item: Item) => {
  router.push(`/items/${item.id}`)
}

// 编辑项目
const handleEdit = (item: Item) => {
  router.push(`/items/${item.id}/edit`)
}

// 删除项目
const handleDelete = async (item: Item) => {
  try {
    await ElMessageBox.confirm(
      '确定要删除这个项目吗？',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    await itemStore.deleteItem(item.id)
    ElMessage.success('删除成功')
  } catch (e) {
    if (e !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 创建新项目
const handleCreate = () => {
  router.push('/items/create')
}
</script>

<template>
  <PageContainer title="Task Management">
    <template #actions>
      <el-button type="primary" @click="handleCreate">
        <el-icon><Plus /></el-icon>
        Create Task
      </el-button>
    </template>

    <div class="table-wrapper" v-loading="itemStore.loading">
      <el-table 
        v-if="itemStore.items.length > 0"
        :data="itemStore.items"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="Title" min-width="200" />
        <el-table-column prop="description" label="Description" min-width="300" />
        <el-table-column 
          prop="created_at" 
          label="Created" 
          width="180"
          :formatter="(row) => new Date(row.created_at).toLocaleString()"
        />
        <el-table-column label="Actions" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button 
                size="small" 
                @click="handleView(row)"
                title="View Details"
              >
                <el-icon><View /></el-icon>
              </el-button>
              <el-button 
                size="small" 
                type="primary" 
                @click="handleEdit(row)"
                title="Edit Task"
              >
                <el-icon><Edit /></el-icon>
              </el-button>
              <el-button 
                size="small" 
                type="danger" 
                @click="handleDelete(row)"
                title="Delete Task"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div v-else-if="!itemStore.loading" class="empty-state">
        <el-empty description="No tasks found">
          <el-button type="primary" @click="handleCreate">Create First Task</el-button>
        </el-empty>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.empty-state {
  padding: 60px 0;
  text-align: center;
}

.table-wrapper {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

:deep(.el-table) {
  --el-table-border-color: var(--el-border-color-lighter);
  --el-table-header-bg-color: #f8f9fc;
}

:deep(.el-button-group) {
  display: flex;
  gap: 4px;
}
</style> 