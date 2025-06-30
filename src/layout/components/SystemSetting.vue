<template>
    <n-drawer v-model:show="show" :width="drawerWidth">
        <n-drawer-content title="系统设置" closable>
            <n-space vertical>
                <div>
                    <n-divider> 主题设置 </n-divider>

                    <n-grid x-gap="12" :cols="3">
                        <n-gi>
                            <ThemeSetting
                                theme="light"
                                :selected="theme_local == 'light'"
                                @click="changeTheme($event, 'light')"
                            />
                        </n-gi>
                        <n-gi>
                            <ThemeSetting
                                theme="dark"
                                :selected="theme_local == 'dark'"
                                @click="changeTheme($event, 'dark')"
                            />
                        </n-gi>
                        <n-gi>
                            <ThemeSetting
                                theme="system"
                                :selected="theme_local === 'system'"
                                @click="changeTheme($event, 'system')"
                            />
                        </n-gi>
                    </n-grid>
                </div>
            </n-space>
            <n-space vertical>
                <div>
                    <n-divider> 颜色设置 </n-divider>
                    <n-grid x-gap="12" :cols="6">
                        <n-gi v-for="value in colors" :key="value">
                            <ColorSetting
                                :color="value"
                                :selected="nowColor === value"
                                @click="setColor(value)"
                            />
                        </n-gi>
                    </n-grid>
                </div>
            </n-space>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import ColorSetting from './SystemSetting/ColorSetting.vue'
import ThemeSetting from './SystemSetting/ThemeSetting.vue'
const { setDark, setLight, setSystem } = themeOption()
const { setColor } = useColor()
const isDark = computed(() => theme.value?.name === 'dark')
const theme_local = computed(() => preferences.theme.local)
const show = ref(false)
const openDrawer = () => {
    show.value = true
}
const nowColor = computed(() => preferences.theme.primaryColor)
const colors = Object.values(preferences.themeOption)
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
        } else if (theme === 'dark') {
            setDark()
        } else {
            setSystem()
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
