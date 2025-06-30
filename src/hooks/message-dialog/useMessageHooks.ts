import { useMessage } from 'naive-ui'
import { type MessageOptions } from 'naive-ui'
const { message: mes } = useDiscreteHook()
interface MessageOptions_ extends MessageOptions {
    content?: string
    placement?: Placement
}
type Placement = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
const Placement = toRef(preferences.option.message, 'placement') // 使用toRef 保持关联
/**
 * 消息钩子函数
 * @returns {Object} 返回消息相关方法对象
 * @returns {Function} create - 创建消息的方法
 * @returns {Function} success - 显示成功消息的快捷方法
 * @returns {Function} error - 显示错误消息的快捷方法
 * @returns {Function} warning - 显示警告消息的快捷方法
 * @returns {Function} info - 显示信息消息的快捷方法
 * @returns {Function} loading - 显示加载消息的快捷方法
 */
export function useMessageHook() {
    const message = useMessage()
    const create = (options: MessageOptions_) => {
        if (!message) {
            mes.warning('无效访问MessageHook,请仔细查看REDEME文件')
            return
        }
        const { content, placement, closable = true, ...options_ } = options

        placement ? (Placement.value = placement) : (Placement.value = 'top-right')
        message.create(content || '', {
            ...options_
        })
    }
    const success = (content: string, options: MessageOptions_ = { content: '' }) => {
        create({ ...options, type: 'success', content })
    }
    const error = (content: string, options: MessageOptions_ = { content: '' }) => {
        create({ ...options, type: 'error', content })
    }
    const warning = (content: string, options: MessageOptions_ = { content: '' }) => {
        create({ ...options, type: 'warning', content })
    }
    const info = (content: string, options: MessageOptions_ = { content: '' }) => {
        create({ ...options, type: 'info', content })
    }
    const loading = (content: string, options: MessageOptions_ = { content: '' }) => {
        create({ ...options, type: 'loading', content })
    }
    return {
        success,
        error,
        warning,
        info,
        loading
    }
}
