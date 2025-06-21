import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from './modules/dynamicRoutes' // 导入我们模拟的动态路由
import Layout from '@/layout/index.vue' // 导入我们创建的Layout组件

// 过滤出需要布局的路由
const layoutRoutes: any = dynamicRoutes.filter(route => route.meta?.requiresLayout)

// 过滤出不需要布局的路由
const routesWithoutLayout: any = dynamicRoutes.filter(route => !route.meta?.requiresLayout)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/dashboard', // 默认重定向到仪表盘页面
      children: [
        ...layoutRoutes
      ]
    },
    ...routesWithoutLayout
  ]
})

export default router