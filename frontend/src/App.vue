<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ElContainer, ElHeader, ElMain, ElMenu, ElMenuItem } from 'element-plus'
</script>

<template>
  <el-container class="app-container">
    <el-header>
      <div class="header-content">
        <router-link to="/" class="logo">项目管理系统</router-link>
        <el-menu
          mode="horizontal"
          router
          :ellipsis="false"
          class="nav-menu"
          :default-active="$route.path"
        >
          <el-menu-item index="/items">项目列表</el-menu-item>
          <el-menu-item index="/items/create">创建项目</el-menu-item>
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
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--el-color-primary);
  text-decoration: none;
  margin-right: 40px;
  white-space: nowrap;
}

.nav-menu {
  border-bottom: none;
}

.el-header {
  background-color: white;
  border-bottom: 1px solid var(--el-border-color-light);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.el-main {
  background-color: var(--el-bg-color-page);
  padding: 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 60px);
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
