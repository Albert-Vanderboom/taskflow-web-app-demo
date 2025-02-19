<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage } from 'element-plus'
import type { Item } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'

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
    ElMessage.error('无效的项目ID')
    router.push('/items')
    return
  }

  loading.value = true
  try {
    const response = await itemStore.getById(id)
    item.value = response
  } catch (e) {
    ElMessage.error('获取项目详情失败')
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
    await itemStore.deleteItem(item.value.id)
    ElMessage.success('删除成功')
    router.push('/items')
  } catch (e) {
    ElMessage.error('删除失败')
  }
}

onMounted(() => {
  fetchItem()
})
</script>

<template>
  <PageContainer title="项目详情">
    <div class="detail-container" v-loading="loading">
      <div class="detail-header">
        <div class="actions">
          <el-button @click="handleBack">返回</el-button>
          <el-button 
            type="primary" 
            @click="handleEdit"
            v-if="item"
          >
            编辑
          </el-button>
          <el-button 
            type="danger" 
            @click="handleDelete"
            v-if="item"
          >
            删除
          </el-button>
        </div>
      </div>

      <div class="detail-content">
        <el-descriptions 
          v-if="item" 
          :column="1" 
          border
          class="descriptions"
        >
          <el-descriptions-item label="ID">
            {{ item.id }}
          </el-descriptions-item>
          
          <el-descriptions-item label="标题">
            {{ item.title }}
          </el-descriptions-item>
          
          <el-descriptions-item label="描述">
            {{ item.description || '暂无描述' }}
          </el-descriptions-item>
          
          <el-descriptions-item label="创建时间">
            {{ new Date(item.created_at).toLocaleString() }}
          </el-descriptions-item>
          
          <el-descriptions-item label="更新时间">
            {{ new Date(item.updated_at).toLocaleString() }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.detail-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.detail-header {
  padding: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  flex: 1;
  padding: 40px 20px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.descriptions {
  width: 100%;
  max-width: 800px;
}

.actions {
  display: flex;
  gap: 12px;
}
</style> 