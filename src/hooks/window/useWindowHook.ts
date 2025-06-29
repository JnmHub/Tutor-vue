import { ref, onMounted, onUnmounted } from 'vue'
// 防抖函数

export function useWindowWidth(delay: number = 300) {
    // 创建响应式的窗口宽度变量
    const windowWidth = ref(window.innerWidth)

    // 更新窗口宽度的处理函数
    const handleResize = () => {
        windowWidth.value = window.innerWidth
    }

    // 组件挂载时添加事件监听
    onMounted(() => {
        console.log('组件挂载时添加事件监听')

        window.addEventListener('resize', handleResize)
    })

    // 组件卸载时移除事件监听
    onUnmounted(() => {
        console.log('组件卸载时移除事件监听')

        window.removeEventListener('resize', handleResize)
    })

    return {
        windowWidth
    }
}
