import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// 定义路由元数据类型
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    requiresAuth?: boolean
    keepAlive?: boolean
  }
}

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'TaskFlow',
      keepAlive: true
    }
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('@/views/ItemList.vue'),
    meta: {
      title: 'Task Management',
      keepAlive: true
    }
  },
  {
    path: '/items/create',
    name: 'item-create',
    component: () => import('@/views/ItemCreate.vue'),
    meta: {
      title: 'Create Task'
    }
  },
  {
    path: '/items/:id',
    name: 'item-detail',
    component: () => import('@/views/ItemDetail.vue'),
    meta: {
      title: 'Task Details'
    },
    // 添加 props 支持，使组件可以直接接收路由参数
    props: route => ({
      id: parseInt(route.params.id as string)
    })
  },
  {
    path: '/items/:id/edit',
    name: 'item-edit',
    component: () => import('@/views/ItemEdit.vue'),
    meta: {
      title: 'Edit Task'
    },
    props: route => ({
      id: parseInt(route.params.id as string)
    })
  },
  {
    // 404 页面
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - TaskFlow`

  // 这里可以添加其他导航守卫逻辑
  // 例如：身份验证、权限检查等

  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  // 可以在这里添加导航完成后的逻辑
  // 例如：关闭加载动画、记录访问日志等
})

export default router
