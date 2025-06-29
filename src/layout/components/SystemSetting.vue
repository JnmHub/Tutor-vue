<template>
    <n-drawer v-model:show="show" :width="drawerWidth">
        <n-drawer-content title="系统设置" closable>
            <n-space vertical>
                <div>
                    <n-divider> 主题设置 </n-divider>
                    <n-grid :cols="2" :gap="12"> </n-grid>
                    <n-grid x-gap="12" :cols="2">
                        <n-gi>
                            <ThemeSetting
                                theme="light"
                                :selected="!isDark"
                                @click="changeTheme($event, 'light')"
                            />
                        </n-gi>
                        <n-gi>
                            <ThemeSetting
                                theme="dark"
                                :selected="isDark"
                                @click="changeTheme($event, 'dark')"
                            />
                        </n-gi>
                    </n-grid>
                </div>
            </n-space>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import ThemeSetting from './SystemSetting/ThemeSetting.vue'
const { setDark, setLight } = themeOption()
const isDark = computed(() => theme.value?.name === 'dark')
const show = ref(false)
const openDrawer = () => {
    show.value = true
}
const { windowWidth } = useWindowWidth()
const drawerWidth = computed(() => {
    if (windowWidth.value > 768) {
        return 300
    }
    return windowWidth.value
})
const changeTheme = (e: MouseEvent, theme: string) => {
    const x = e.clientX
    const y = e.clientY
    const targetRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    )
    const transiton = document.startViewTransition(() => {
        if (theme === 'light') {
            setLight()
        } else {
            setDark()
        }
    })
    transiton.ready.then(() => {
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0% at ${x}px ${y}px)`,
                    `circle(${targetRadius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 800,
                pseudoElement: '::view-transition-new(root)'
            }
        )
    })
}
defineExpose({
    openDrawer
})
</script>

<style scoped></style>
