import { computed, ref } from 'vue'
export const eventSpinning = ref(false)
export const loadingText = ref('Loading...')
const startTime = ref(0)
const minShowTime = 500 // 最小显示时间
const enableLoading = computed(() => preferences.event.loading)

// 结束加载动画
export const onLoaded = () => {
    if (!enableLoading.value) {
        return
    }
    const processTime = performance.now() - startTime.value
    if (processTime < minShowTime) {
        setTimeout(() => {
            eventSpinning.value = false
        }, minShowTime - processTime)
    } else {
        eventSpinning.value = false
    }
}
// 开始动画
export const onLoading = (text: string = loadingText.value) => {
    if (!enableLoading.value) {
        return
    }
    loadingText.value = text
    eventSpinning.value = true
    startTime.value = performance.now()
}
