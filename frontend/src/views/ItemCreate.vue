<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { CreateItemDTO } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'

const router = useRouter()
const itemStore = useItemStore()

// 表单数据
const formData = ref<CreateItemDTO>({
  title: '',
  description: ''
})

// 表单规则
const rules = ref<FormRules>({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
  ],
  description: [
    { max: 500, message: '长度不能超过 500 个字符', trigger: 'blur' }
  ]
})

// 表单引用
const formRef = ref<FormInstance>()

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    // 表单验证
    await formRef.value.validate()
    // 创建项目
    await itemStore.createItem(formData.value)
    ElMessage.success('创建成功')
    // 使用 replace 而不是 push，这样返回时不会回到创建页面
    router.replace('/items')
  } catch (e) {
    ElMessage.error('创建失败，请检查表单')
  }
}

// 取消
const handleCancel = () => {
  router.back()
}
</script>

<template>
  <PageContainer>
    <template #actions>
      <el-button @click="handleCancel">返回</el-button>
    </template>

    <el-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      class="form"
    >
      <el-form-item label="标题" prop="title">
        <el-input 
          v-model="formData.title"
          placeholder="请输入标题"
        />
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input
          v-model="formData.description"
          type="textarea"
          :rows="4"
          placeholder="请输入描述"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="itemStore.loading">
          创建
        </el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<style scoped>
.form {
  max-width: 800px;
  margin: 0 auto;
}

:deep(.el-form-item__content) {
  justify-content: flex-start;
}

:deep(.el-input),
:deep(.el-textarea) {
  width: 100%;
}
</style> 