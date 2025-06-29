<template>
    <div class="content-main">
        <router-view v-slot="{ Component, route }">
            <JnmSpinner class="size-full" spinning />
            <Transition name="slide-up" mode="out-in">
                <keep-alive :include="tabsStore.cachedRoutes.join(',')">
                    <component
                        :is="iframeUrl ? hIframe : Component"
                        :key="route.fullPath"
                        v-if="!tabsStore.isRefreshing"
                    />
                </keep-alive>
            </Transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import JnmLoading from './loading.vue'
import JnmSpinner from './spinner.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTabsViewStore } from '@/stores/tabsViewStore' // 引入 store
import type { CSSProperties } from 'vue'
const tabsStore = useTabsViewStore()
const openIframe = ref(false)
const route = useRoute()
const iframeStyle = computed(() => {
    return (route.meta.iframeStyle || {}) as CSSProperties
})
const isIframe = computed(() => route.meta && !!route.meta.iframeUrl && !route.meta.blank)
const iframeUrl = computed(() => (route.meta.iframeUrl as string) || '')

const hIframe = () => {
    return h(
        'iframe',
        {
            src: iframeUrl.value,
            class: 'iframe-content'
        },
        {
            default: () => '加载中'
        }
    )
}
</script>

<style scoped>
.content-main {
    position: relative;
    padding-bottom: 10px;
    width: 100%;
    height: 100%;
}
.iframe-container {
    width: 100%;
    height: 100%;
}
.iframe-content {
    width: 100%;
    height: 100%;
    border: none;
    :deep(.el-tabs__content) {
        height: 100%;
    }
}
</style>
