<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { CreateItemDTO } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const itemStore = useItemStore()

// 表单数据
const formData = ref<CreateItemDTO>({
  title: '',
  description: ''
})

// 错误消息
const messages = {
  validation: {
    title: {
      required: 'Please enter a title',
      length: 'Title must be between 1 and 100 characters'
    },
    description: {
      length: 'Description cannot exceed 500 characters'
    }
  },
  success: 'Task created successfully',
  error: 'Failed to create task'
}

// 表单规则
const rules = ref<FormRules>({
  title: [
    { required: true, message: messages.validation.title.required, trigger: 'blur' },
    { min: 1, max: 100, message: messages.validation.title.length, trigger: 'blur' }
  ],
  description: [
    { max: 500, message: messages.validation.description.length, trigger: 'blur' }
  ]
})

// 表单引用
const formRef = ref<FormInstance>()
const loading = ref(false)

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    loading.value = true
    // 表单验证
    await formRef.value.validate()
    // 创建项目
    await itemStore.createItem(formData.value)
    ElMessage.success(messages.success)
    // 使用 replace 而不是 push，这样返回时不会回到创建页面
    router.replace('/items')
  } catch (e) {
    ElMessage.error(messages.error)
  } finally {
    loading.value = false
  }
}

// 取消
const handleCancel = () => {
  router.back()
}
</script>

<template>
  <PageContainer title="Create New Task">
    <template #actions>
      <el-button @click="handleCancel">
        <el-icon><ArrowLeft /></el-icon>
        Back
      </el-button>
    </template>

    <div class="form-container">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="form"
        :disabled="loading"
      >
        <el-form-item label="Title" prop="title">
          <el-input 
            v-model="formData.title"
            placeholder="Enter task title"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="Enter task description"
            maxlength="500"
            show-word-limit
            resize="vertical"
          />
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleSubmit" 
            :loading="loading"
            size="large"
          >
            Create Task
          </el-button>
          <el-button 
            @click="handleCancel"
            :disabled="loading"
          >
            Cancel
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

:deep(.el-form-item:last-child) {
  margin-bottom: 0;
  text-align: right;
}

:deep(.el-button) {
  margin-left: 12px;
}

:deep(.el-button:first-child) {
  margin-left: 0;
}

:deep(.el-input__count) {
  background: transparent;
}
</style> 