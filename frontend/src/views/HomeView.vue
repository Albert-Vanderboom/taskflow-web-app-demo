<script setup lang="ts">
import { ElCard, ElButton } from 'element-plus'
import PageContainer from '@/components/PageContainer.vue'
</script>

<template>
  <PageContainer>
    <div class="home-content">
      <div class="hero-section">
        <h1>Streamline Your Workflow</h1>
        <p class="subtitle">Manage tasks efficiently with our intuitive platform</p>
        <el-button type="primary" size="large" @click="$router.push('/items')">
          Get Started
        </el-button>
      </div>

      <div class="features">
        <div class="feature-card">
          <h3>Simple & Intuitive</h3>
          <p>Easy-to-use interface for managing your tasks</p>
        </div>
        <div class="feature-card">
          <h3>Real-time Updates</h3>
          <p>Stay synchronized with instant task updates</p>
        </div>
        <div class="feature-card">
          <h3>Organized Workflow</h3>
          <p>Keep your projects structured and on track</p>
        </div>
      </div>
    </div>
  </PageContainer>
</template>

<style scoped>
.home-content {
  padding: 40px 0;
  text-align: center;
}

.hero-section {
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 3rem;
  color: #2B3A67;
  margin-bottom: 20px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 40px;
}

.feature-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: #2B3A67;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}
</style>