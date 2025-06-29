<template>
    <div class="header-container">
        <div class="left-section">
            <n-icon size="24" class="hamburger" @click="toggleDrawer">
                <MenuOutline />
            </n-icon>
            <div class="breadcrumb-section">
                <n-breadcrumb>
                    <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" separator=">">
                        <div class="flex-center">
                            <n-icon v-if="item.meta.icon" class="breadcrumb-icon">
                                <component :is="item.meta.icon" />
                            </n-icon>
                            {{ item.meta.title }}
                        </div>
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>

        <div class="right-section">
            <n-tooltip trigger="hover">
                <template #trigger>
                    <n-icon size="20" @click="toggleFullScreen">
                        <ExpandOutline v-if="!isFullscreen" />
                        <ContractOutline v-else />
                    </n-icon>
                </template>
                {{ isFullscreen ? '退出全屏' : '全屏' }}
            </n-tooltip>

            <n-tooltip trigger="hover">
                <template #trigger>
                    <n-icon size="20" @click="openDrawer" ref="changeTheme">
                        <Settings />
                    </n-icon>
                </template>
                系统设置
            </n-tooltip>
            <n-dropdown trigger="hover" :options="userOptions" @select="handleUserSelect">
                <n-avatar
                    round
                    size="medium"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
            </n-dropdown>
        </div>
        <SystemSetting ref="themeSettingRef" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SystemSetting from './SystemSetting.vue'
import {
    MenuOutline,
    ExpandOutline,
    ContractOutline,
    SunnyOutline,
    MoonOutline,
    Settings,
    LogOutOutline,
    KeyOutline
} from '@vicons/ionicons5'
import { useStoreHook } from '@/hooks/sotre/useStoreHook'
import { NIcon } from 'naive-ui'
import { useMessageHook } from '@/hooks/message-dialog/useMessageHooks'

const emit = defineEmits(['toggle-drawer'])
const { info } = useMessageHook()
const route = useRoute()
const router = useRouter()
const userStore = useStoreHook().user()
const themeSettingRef = ref<any>()
const isFullscreen = ref(document.fullscreenElement !== null)

// 面包屑数据
const breadcrumbs = computed(() => {
    return route.matched.filter(item => item.meta && item.meta.title)
})

// 切换全屏
const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        isFullscreen.value = true
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen()
            isFullscreen.value = false
        }
    }
}

const openDrawer = () => {
    themeSettingRef.value.openDrawer()
}

// 用户下拉菜单
const userOptions = [
    {
        label: '修改密码',
        key: 'changePassword',
        icon: () => h(NIcon, null, { default: () => h(KeyOutline) })
    },
    {
        label: '退出登录',
        key: 'logout',
        icon: () => h(NIcon, null, { default: () => h(LogOutOutline) })
    }
]

const handleUserSelect = (key: string) => {
    if (key === 'logout') {
        userStore.logout()
        router.push('/login')
    } else {
        // 提示功能待开发
        info('功能待开发')
    }
}

const toggleDrawer = () => {
    emit('toggle-drawer')
}
</script>

<style scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 20px;
}

.left-section,
.breadcrumb-section,
.right-section {
    display: flex;
    align-items: center;
    gap: 20px;
}

.left-section {
    flex-shrink: 0;
}

.breadcrumb-section {
    flex-grow: 1;
    justify-content: center;
    display: none; /* 在移动端默认隐藏面包屑 */
}

.right-section {
    flex-shrink: 0;
}

.hamburger {
    cursor: pointer;
    margin-right: 15px;
    display: block;
}

.logo-section {
    display: flex;
    align-items: center;
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

.breadcrumb-icon {
    vertical-align: middle;
    margin-right: 5px;
}

.n-icon {
    cursor: pointer;
}

/* 桌面端样式 */
@media (min-width: 768px) {
    .hamburger {
        display: none;
    }

    .breadcrumb-section {
        display: flex;
    }
}
</style>
