import type { GlobalTheme } from 'naive-ui'
import { darkTheme, useOsTheme } from 'naive-ui'
const osTheme = useOsTheme()
const storage = useStorageManager()
type ThemeLocal = 'light' | 'dark' | 'system'
type Placement = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
const defaultPreferences = {
    transition: {
        loading: true
    },
    event: {
        loading: true
    },
    theme: {
        local: 'light' as ThemeLocal,
        primaryColor: '#18a058'
    },
    themeOption: {
        默认: '#18a058',
        紫罗兰: '#7166F0',
        柠檬绿: 'rgb(160, 204, 102)',
        柠檬黄: 'rgb(240, 180, 52)',
        柠檬红: 'rgb(240, 102, 102)',
        天蓝色: 'rgb(52, 152, 219)',
        洋红色: 'rgb(219, 52, 102)',
        洋绿色: 'rgb(102, 180, 160)',
        天青色: 'rgb(52, 219, 219)',
        洋蓝色: 'rgb(102, 152, 219)',
        洋紫色: 'rgb(180, 102, 219)',
        洋粉色: 'rgb(219, 102, 180)',
        洋黄色: 'rgb(219, 219, 52)',
        柠檬橙: 'rgb(240, 160, 52)'
    } as const,
    option: {
        message: {
            placement: 'top-right' as Placement
        }
    }
}
// 1. 定义主题键名类型
type ThemeName = keyof typeof defaultPreferences.themeOption // 或手动写联合类型

// 2. 定义颜色值类型
type ColorValue = `#${string}` | `rgb(${number}, ${number}, ${number})`

// 3. 完整配置类型
interface AppConfig {
    transition: {
        loading: boolean
    }
    event: {
        loading: boolean
    }
    theme: {
        local: ThemeLocal
        primaryColor: ColorValue
    }
    themeOption: Record<ThemeName, ColorValue>
    option: {
        message: {
            placement: Placement
        }
    }
}

export const preferences = reactive(
    (storage.getItem('preferences') as AppConfig) || defaultPreferences
)
export const theme = computed<GlobalTheme | null>(() => {
    const isDark =
        preferences.theme.local === 'dark' ||
        (preferences.theme.local === 'system' && osTheme.value === 'dark')

    document.documentElement.classList.toggle('dark', isDark)
    return isDark ? darkTheme : null
})
watch(
    () => preferences,
    newPreferences => {
        // 持久化存储数据
        storage.setItem('preferences', newPreferences)
        // 设置主题颜色
        document.documentElement.style.setProperty(
            '--color-primary',
            newPreferences.theme.primaryColor
        )
    },
    { deep: true, immediate: true }
)
