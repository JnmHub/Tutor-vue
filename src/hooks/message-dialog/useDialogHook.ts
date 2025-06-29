// src/hooks/useDialogHook.ts
import { useDialog } from 'naive-ui'
export type DialogConfirmType = 'success' | 'warning' | 'info' | 'error'

interface DialogOptions {
    type?: DialogConfirmType
    title: string
    content: string
    positiveText?: string
    negativeText?: string
    draggable?: boolean
    ok?: () => Promise<void> | void
    no?: () => Promise<void> | void
}
/**
 * 对话框钩子函数
 * @returns {Object} 返回对话框相关方法对象
 * @returns {Function} showConfirm - 显示确认对话框的方法
 * @returns {Function} showSuccess - 显示成功对话框的快捷方法
 */
export function useDialogHook() {
    const dialog = useDialog()
    /**
     * 显示确认对话框
     * @param options 对话框配置
     */
    const showConfirm = (options: DialogOptions) => {
        const {
            type = 'info',
            title,
            content,
            positiveText = '确定',
            negativeText = '',
            draggable = true,
            ok: onPositiveClick,
            no: onNegativeClick
        } = options

        const d = dialog[type]({
            title,
            content,
            positiveText,
            negativeText,
            draggable,
            onPositiveClick: () => {
                if (onPositiveClick) {
                    const result = onPositiveClick()
                    // 如果是 Promise，显示加载状态
                    if (result instanceof Promise) {
                        d.loading = true
                        return result.finally(() => {
                            d.loading = false
                        })
                    }
                }
            },
            onNegativeClick
        })
    }

    /**
     * 快速显示成功对话框
     * @param content 内容
     * @param title 标题 (默认"提示")
     */
    const showSuccess = (content: string, title = '提示') => {
        showConfirm({
            type: 'success',
            title,
            content,
            positiveText: '我知道了'
        })
    }

    return {
        showConfirm,
        showSuccess
        // 可以继续扩展其他快捷方法...
    }
}
