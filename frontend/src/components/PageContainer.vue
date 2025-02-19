<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="page-container">
    <div class="page-header">
      <h1 v-if="title">{{ title }}</h1>
      <div class="page-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 100px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 20px, 0;
}

.page-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.page-content {
  padding: 24px;
}
</style> 