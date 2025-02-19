<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { UpdateItemDTO } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()

// 表单数据
const formData = ref<UpdateItemDTO>({
  title: '',
  description: ''
})

// 表单规则
const messages = {
  validation: {
    title: 'Please enter a title',
    titleLength: 'Title must be between 1 and 100 characters',
    descriptionLength: 'Description cannot exceed 500 characters'
  },
  success: 'Task updated successfully',
  error: 'Failed to update task',
  invalidId: 'Invalid task ID',
  loadError: 'Failed to load task details'
}

const rules = ref<FormRules>({
  title: [
    { required: true, message: messages.validation.title, trigger: 'blur' },
    { min: 1, max: 100, message: messages.validation.titleLength, trigger: 'blur' }
  ],
  description: [
    { max: 500, message: messages.validation.descriptionLength, trigger: 'blur' }
  ]
})

// 表单引用
const formRef = ref<FormInstance>()
const loading = ref(true)

// 获取项目数据
const fetchItem = async () => {
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    ElMessage.error(messages.invalidId)
    router.push('/items')
    return
  }

  loading.value = true
  try {
    const response = await itemStore.getById(id)
    formData.value = {
      title: response.title,
      description: response.description
    }
  } catch (e) {
    ElMessage.error(messages.loadError)
    router.push('/items')
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  const id = parseInt(route.params.id as string)
  if (isNaN(id)) {
    ElMessage.error(messages.invalidId)
    return
  }

  try {
    // 表单验证
    await formRef.value.validate()
    // 更新项目
    await itemStore.updateItem(id, formData.value)
    ElMessage.success(messages.success)
    // 返回详情页
    router.push(`/items/${id}`)
  } catch (e) {
    ElMessage.error(messages.error)
  }
}

// 取消
const handleCancel = () => {
  router.back()
}

onMounted(() => {
  fetchItem()
})
</script>

<template>
  <PageContainer title="Edit Task">
    <template #actions>
      <el-button @click="handleCancel">
        <el-icon><ArrowLeft /></el-icon>
        Back
      </el-button>
    </template>

    <div class="form-container" v-loading="loading">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="form"
      >
        <el-form-item label="Title" prop="title">
          <el-input 
            v-model="formData.title"
            placeholder="Enter task title"
          />
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="Enter task description"
          />
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleSubmit" 
            :loading="itemStore.loading"
            size="large"
          >
            Save Changes
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageContainer>
</template>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input__wrapper),
:deep(.el-textarea__wrapper) {
  box-shadow: none;
  border: 1px solid var(--el-border-color);
  transition: all 0.2s;
}

:deep(.el-input__wrapper:hover),
:deep(.el-textarea__wrapper:hover) {
  border-color: var(--el-color-primary);
}
</style> 