<template>
    <n-layout class="main-layout" has-sider>
        <n-drawer v-model:show="isDrawerActive" :width="200" placement="left">
            <n-config-provider abstract :theme="sidebarTheme_">
                <n-layout-sider
                    bordered
                    :width="200"
                    :native-scrollbar="false"
                    class="drawer-sider"
                >
                    <div class="logo-section-drawer">
                        <img src="@/assets/logo.svg" alt="logo" class="logo-img" />
                    </div>
                    <LayoutSider />
                </n-layout-sider>
            </n-config-provider>
        </n-drawer>
        <n-config-provider abstract :theme="sidebarTheme_">
            <n-layout-sider
                style="z-index: 101"
                bordered
                show-trigger
                collapse-mode="width"
                :collapsed-width="64"
                :width="200"
                :native-scrollbar="false"
                v-model:collapsed="collapsed"
                class="desktop-sider"
            >
                <div class="logo-section-drawer">
                    <img src="@/assets/logo.svg" alt="logo" class="logo-img" />
                    <h1
                        class="logo-title whitespace-nowrap transition-opacity duration-300 ease-in-out"
                        :class="{
                            'opacity-0': collapsed,
                            'opacity-100': !collapsed
                        }"
                        v-show="!collapsed"
                    >
                        My Admin
                    </h1>
                </div>
                <LayoutSider :collapsed="collapsed" />
            </n-layout-sider>
        </n-config-provider>
        <n-layout>
            <LayoutHeader @toggle-drawer="isDrawerActive = true" />

            <div class="content-layout content-flex">
                <TabsView />
                <div class="layout-content">
                    <LayoutContent />
                </div>
            </div>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LayoutHeader from './components/Header.vue'
import LayoutSider from './components/Sider.vue'
import LayoutContent from './components/Content/Content.vue'
import TabsView from './components/TabsView.vue'
const collapsed = ref(false)
const isDrawerActive = ref(false)
const sidebarTheme_ = computed(() => sidebarTheme.value)
</script>

<style scoped>
.main-layout {
    height: 100%;
    display: flex;
    flex-direction: row;
}

.content-layout {
    height: calc(100% - 50px);
    overflow: hidden;
    background-color: var(--jnm-content-color);
    transition: var(--jnm-naive-transition);
}

.layout-content {
    background-color: var(--jnm-content-color);
    padding: 0 0 0 10px;
    flex-grow: 1;
    overflow-y: auto; /* 内容溢出时滚动 */
    display: flex;
    margin-bottom: 10px;
    transition: var(--jnm-naive-transition);
}

.layout-footer {
    width: 100%;
    flex-shrink: 0; /* 防止页脚被压缩 */
    /* align-self: flex-end; */
}

.desktop-sider {
    display: block;
}

.drawer-sider {
    height: 100%;
}

.logo-section-drawer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    height: 64px;
}

.logo-img {
    width: 32px;
    height: 32px;
}

.logo-title {
    font-size: 18px;
    margin-left: 10px;
    font-weight: bold;
}

/* 移动端隐藏桌面侧边栏 */
@media (max-width: 767px) {
    .desktop-sider {
        display: none;
    }
}
</style>
