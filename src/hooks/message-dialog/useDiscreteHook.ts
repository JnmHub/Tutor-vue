import { createDiscreteApi, type ConfigProviderProps, darkTheme, lightTheme } from 'naive-ui'
import { computed, ref } from 'vue'
const Placement = toRef(preferences.option.message, 'placement') // 使用toRef 保持关联
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: theme.value?.name === 'dark' ? darkTheme : lightTheme
}))
const { message, dialog, notification, loadingBar, modal } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
    {
        messageProviderProps: {
            placement: Placement.value,
            closable: true
        },
        configProviderProps: configProviderPropsRef
    }
)
/**
 * 离散式UI钩子函数
 * @returns {Object} 返回离散式UI相关方法对象
 * @returns {Function} message - 显示消息的方法
 * @returns {Function} dialog - 显示对话框的方法
 * @returns {Function} notification - 显示通知的方法
 * @returns {Function} loadingBar - 显示加载条的方法
 * @returns {Function} modal - 显示模态框的方法
 */
export function useDiscreteHook() {
    return {
        message,
        dialog,
        notification,
        loadingBar,
        modal
    }
}
