import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemList from '../views/ItemList.vue'
import ItemDetail from '../views/ItemDetail.vue'
import ItemCreate from '../views/ItemCreate.vue'
import ItemEdit from '../views/ItemEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/items',
      name: 'items',
      component: () => import('@/views/ItemList.vue'),
      meta: {
        title: '项目列表',
        keepAlive: true
      }
    },
    {
      path: '/items/create',
      name: 'item-create',
      component: () => import('@/views/ItemCreate.vue'),
      meta: {
        title: '创建项目'
      }
    },
    {
      path: '/items/:id',
      name: 'item-detail',
      component: () => import('@/views/ItemDetail.vue'),
      meta: {
        title: '项目详情'
      }
    },
    {
      path: '/items/:id/edit',
      name: 'item-edit',
      component: () => import('@/views/ItemEdit.vue'),
      meta: {
        title: '编辑项目'
      }
    }
  ]
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - 项目管理系统`
  next()
})

export default router
