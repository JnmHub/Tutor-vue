import type { GlobalTheme } from 'naive-ui'
import { darkTheme, useOsTheme } from 'naive-ui'
import { ref, watch } from 'vue'
const osTheme = useOsTheme()

const theme_local = localStorage.getItem('theme')
export const theme = ref<GlobalTheme | null>(theme_local === 'dark' ? darkTheme : null)
watch(
    osTheme,
    newVal => {
        if (theme_local) return
        if (newVal === 'dark') {
            theme.value = darkTheme
            document.documentElement.classList.add('dark')
        } else {
            theme.value = null
            document.documentElement.classList.remove('dark')
        }
    },
    {
        immediate: true
    }
)
function setLight() {
    theme.value = null
    localStorage.removeItem('theme')
    document.documentElement.classList.remove('dark')
}
function setDark() {
    theme.value = darkTheme
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')
}
/**
 * 获取主题配置
 * @returns {Object} 主题配置对象
 * @returns {Function} setLight - 设置亮色主题
 * @returns {Function} setDark - 设置暗色主题
 */
export function themeOption() {
    return {
        setLight,
        setDark
    }
}
