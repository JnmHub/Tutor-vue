import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import router from '@/router'

export interface Tab {
  path: string
  name: string | symbol | undefined
  title: string
  closable: boolean
  isIframe?: boolean
  icon?: string
}

export const useTabsViewStore = defineStore(
  'tabs-view',
  () => {
    // 已打开的 Tab 列表
    const tabsList = ref<Tab[]>([
      // 首页默认固定
      {
        path: '/dashboard',
        name: 'Dashboard',
        title: '仪表盘',
        closable: false
      }
    ])

    // 需要被 keep-alive 缓存的路由 name 列表
    const cachedRoutes = computed(() =>
      tabsList.value.filter(tab => tab.name).map(tab => tab.name as string)
    )

    // 控制页面刷新
    const isRefreshing = ref(false)

    /**
     * 添加一个 Tab
     * @param route 当前路由
     */
    function addTab(route: RouteLocationNormalized) {
      // 不添加没有 title 的路由
      if (!route.meta.title) {
        return
      }

      // 检查 Tab 是否已存在
      const isTabExists = tabsList.value.some(tab => tab.path === route.fullPath)
      if (!isTabExists) {
        tabsList.value.push({
          path: route.fullPath,
          name: route.name,
          title: route.meta.title as string,
          closable: route.path !== '/dashboard' // 仪表盘不可关闭
        })
      }
    }

    /**
     * 移除一个 Tab
     * @param path Tab 路径
     */
    function removeTab(path: string) {
      const tabIndex = tabsList.value.findIndex(tab => tab.path === path)
      if (tabIndex === -1) return

      // 如果关闭的是当前激活的 Tab，则需要跳转到前一个或后一个 Tab
      if (router.currentRoute.value.fullPath === path) {
        const nextTab = tabsList.value[tabIndex + 1] || tabsList.value[tabIndex - 1]
        if (nextTab) router.push(nextTab.path)
      }

      tabsList.value.splice(tabIndex, 1)
    }

    /**
     * 刷新指定页面
     * @param path 要刷新的 Tab 路径
     */
    async function refreshPage(path: string) {
      const tab = tabsList.value.find(t => t.path === path)
      if (!tab || !tab.name) return

      // 1. 临时从缓存列表中移除该页面的 name
      const cacheName = tab.name as string
      const cacheIndex = cachedRoutes.value.indexOf(cacheName)
      if (cacheIndex > -1) {
        cachedRoutes.value.splice(cacheIndex, 1)
      }
      
      // 2. 设置刷新状态，让 Content.vue 中的 v-if 生效
      isRefreshing.value = true

      // 3. 使用 nextTick 确保 DOM 更新（v-if 卸载组件）
      await nextTick()

      // 4. 恢复刷新状态和缓存
      isRefreshing.value = false
      if (cacheIndex > -1) {
        cachedRoutes.value.splice(cacheIndex, 0, cacheName)
      }
    }

    /**
     * 关闭其他 Tab
     * @param path 当前 Tab 路径
     */
    function closeOtherTabs(path: string) {
      tabsList.value = tabsList.value.filter(tab => !tab.closable || tab.path === path)
      if (router.currentRoute.value.fullPath !== path) {
        router.push(path)
      }
    }

    /**
     * 关闭所有 Tab
     */
    function closeAllTabs() {
      tabsList.value = tabsList.value.filter(tab => !tab.closable)
      // 跳转到首页
      router.push(tabsList.value[0]?.path || '/dashboard')
    }

    return {
      tabsList,
      cachedRoutes,
      isRefreshing,
      addTab,
      removeTab,
      refreshPage,
      closeOtherTabs,
      closeAllTabs
    }
  },
  {
    // 开启持久化
    persist: {
      storage: localStorage // 或者 sessionStorage
    }
  }
)