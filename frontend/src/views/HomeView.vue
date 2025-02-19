<script setup lang="ts">
import { ElCard, ElButton } from 'element-plus'
import PageContainer from '@/components/PageContainer.vue'
</script>

<template>
  <PageContainer title="首页">
    <div class="home-content">
      <el-card class="welcome-card">
        <template #header>
          <h2>欢迎使用项目管理系统</h2>
        </template>
        <div class="content">
          <p>这是一个使用 Vue 3 + FastAPI 构建的简单 CRUD 应用。</p>
          <el-button type="primary" @click="$router.push('/items')">
            查看项目列表
          </el-button>
        </div>
      </el-card>
    </div>
  </PageContainer>
</template>

<style scoped>
.home-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.welcome-card {
  width: 100%;
  max-width: 600px;
}

.content {
  text-align: center;
  padding: 40px 20px;
}

h2 {
  margin: 0;
  font-size: 20px;
  color: var(--el-text-color-primary);
}

p {
  font-size: 16px;
  color: var(--el-text-color-regular);
  margin: 20px 0 30px;
}
</style>