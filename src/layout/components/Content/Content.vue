<template>
    <div id="content-container" class="content-main overflow-hidden">
        <router-view v-slot="{ Component, route }">
            <JnmSpinner :spinning="spinning" />
            <JnmLoading :spinning="loadingSpinning" :text="loadingtext" />
            <n-scrollbar trigger="none" content-style="padding-right: 10px;">
                <div :style="{ minHeight: contentHeightComputed }">
                    <Transition name="slide-up" mode="out-in">
                        <keep-alive :include="tabsStore.cachedRoutes.join(',')">
                            <component
                                :height="contentHeightComputed"
                                :is="iframeUrl ? hIframe : Component"
                                :key="route.fullPath"
                                v-if="!tabsStore.isRefreshing"
                            />
                        </keep-alive>
                    </Transition>
                </div>
            </n-scrollbar>
        </router-view>
    </div>
</template>

<script setup lang="ts">
useContentResize()
const { spinning, onEnd, enableLoading } = useContentSpinner()
import JnmLoading from './loading.vue'
import JnmSpinner from './spinner.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTabsViewStore } from '@/stores/tabsViewStore' // 引入 store
const tabsStore = useTabsViewStore()
const route = useRoute()

const isIframe = computed(() => route.meta && !!route.meta.iframeUrl && !route.meta.blank)
if (isIframe.value && !spinning.value && enableLoading.value) {
    spinning.value = true
}
const iframeUrl = computed(() => (route.meta.iframeUrl as string) || '')

const contentHeightComputed = computed(() => {
    return contentHeight.value + 'px'
})
const loadingSpinning = computed(() => eventSpinning.value)
const loadingtext = computed(() => loadingText.value)
const hIframe = () => {
    return h(
        'iframe',
        {
            id: 'iframe-content',
            src: iframeUrl.value,
            class: 'iframe-content',
            onLoad: async () => {
                await nextTick()
                ;(document.getElementById('iframe-content') as HTMLElement).style.height =
                    contentHeightComputed.value
                onEnd()
            }
        },
        {
            default: () => '加载中'
        }
    )
}
onMounted(() => {
    console.log(contentHeight.value + 'px')
})
</script>

<style scoped>
.content-main {
    position: relative;
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
