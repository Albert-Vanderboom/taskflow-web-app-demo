<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem } from 'element-plus'
import { ref } from 'vue'

const error = ref<string | null>(null)
</script>

<template>
  <el-container class="app-container">
    <el-header>
      <div class="header-content">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.svg" alt="TaskFlow Logo" class="logo-image">
          TaskFlow
        </router-link>
        <el-menu
          mode="horizontal"
          router
          :ellipsis="false"
          class="nav-menu"
          :default-active="$route.path"
        >
          <el-menu-item index="/items">Tasks</el-menu-item>
          <el-menu-item index="/items/create">New Task</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <el-main>
      <div class="main-content">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </el-main>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </el-container>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 40px;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2B3A67;
  text-decoration: none;
  margin-right: 40px;
  white-space: nowrap;
  letter-spacing: -1px;
}

.logo-image {
  height: 32px;
  margin-right: 10px;
}

.nav-menu {
  border-bottom: none;
  font-size: 15px;
}

.el-header {
  background-color: white;
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.el-main {
  background-color: var(--el-bg-color-page);
  padding: 0;
  min-height: calc(100vh - 60px);
}

.main-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  min-height: calc(100vh - 60px);
  position: relative;
}

.error-message {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--el-color-danger);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}
</style>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: var(--el-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color-page);
}

#app {
  height: 100vh;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 10px;
  }

  .logo {
    margin-bottom: 10px;
  }

  .nav-menu {
    width: 100%;
  }

  .el-main {
    padding: 100px 10px 20px;
  }
}
</style>
