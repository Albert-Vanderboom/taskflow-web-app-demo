<script setup lang="ts">
import { useRouter } from 'vue-router'
import PageContainer from '@/components/PageContainer.vue'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <PageContainer>
    <div class="not-found">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <el-button type="primary" @click="goHome">
        Return Home
      </el-button>
    </div>
  </PageContainer>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 60px 20px;
}

h1 {
  font-size: 6rem;
  color: #2B3A67;
  margin: 0 0 20px;
  font-weight: 700;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}
</style> 