// 防抖函数
export const windowWidth = ref(window.innerWidth)
export const contentHeight = ref()
const windowWidthHandleResize = () => {
    windowWidth.value = window.innerWidth
}
/**
 * 不依赖于onMounted
 */
window.addEventListener('resize', windowWidthHandleResize)
/**
 * 依赖onMounted
 */
export const useContentResize = () => {
    onMounted(() => {
        contentHeight.value = document.getElementById('content-container')?.clientHeight
        window.addEventListener('resize', () => {
            contentHeight.value = document.getElementById('content-container')?.clientHeight
            console.log(`output->contentHeight.value`, contentHeight.value)
        })
    })
}
