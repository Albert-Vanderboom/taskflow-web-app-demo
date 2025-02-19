<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { UpdateItemDTO } from '@/types/item'
import PageContainer from '@/components/PageContainer.vue'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()

// 表单数据
const formData = ref<UpdateItemDTO>({
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
const loading = ref(true)

// 获取项目数据
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
    formData.value = {
      title: response.title,
      description: response.description
    }
  } catch (e) {
    ElMessage.error('获取项目详情失败')
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
    ElMessage.error('无效的项目ID')
    return
  }

  try {
    // 表单验证
    await formRef.value.validate()
    // 更新项目
    await itemStore.updateItem(id, formData.value)
    ElMessage.success('更新成功')
    // 返回详情页
    router.push(`/items/${id}`)
  } catch (e) {
    ElMessage.error('更新失败，请检查表单')
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
  <PageContainer title="编辑项目">
    <div class="form-container">
      <div class="form-header">
        <el-button @click="handleCancel">返回</el-button>
      </div>
      
      <div class="form-content" v-loading="loading">
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
              保存
            </el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-header {
  padding: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

.form-content {
  flex: 1;
  padding: 40px 20px;
  overflow: auto;
  display: flex;
  justify-content: center;
}

.form {
  width: 100%;
  max-width: 800px;
}

:deep(.el-form-item__content) {
  justify-content: flex-start;
}

:deep(.el-input),
:deep(.el-textarea) {
  width: 100%;
}

:deep(.el-form-item:last-child) {
  margin-bottom: 0;
}
</style> 