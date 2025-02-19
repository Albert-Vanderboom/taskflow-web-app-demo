<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Item } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'

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
  <PageContainer>
    <template #actions>
      <el-button type="primary" @click="handleCreate">创建项目</el-button>
    </template>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div class="table-wrapper" v-loading="itemStore.loading">
      <el-table 
        v-if="itemStore.items.length > 0"
        :data="itemStore.items"
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="description" label="描述" />
        <el-table-column 
          prop="created_at" 
          label="创建时间" 
          width="180"
          :formatter="(row) => new Date(row.created_at).toLocaleString()"
        />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button size="small" @click="handleView(row)">查看</el-button>
              <el-button size="small" type="primary" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <div v-else-if="!itemStore.loading" class="empty-text">
        暂无数据
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.list-header {
  padding: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.table-container {
  flex: 1;
  padding: 20px;
  overflow: auto;
  min-height: 0; /* 重要：防止表格溢出 */
}

:deep(.el-table) {
  height: 100%;
  --el-table-border-color: var(--el-border-color-light);
}

:deep(.el-table__inner-wrapper) {
  height: 100%;
}

.table-wrapper {
  min-height: 200px;
  position: relative;
}

.error-message {
  color: var(--el-color-danger);
  padding: 12px;
  margin-bottom: 16px;
  background-color: var(--el-color-danger-light-9);
  border-radius: 4px;
}

.empty-text {
  text-align: center;
  color: var(--el-text-color-secondary);
  padding: 30px 0;
}
</style> 