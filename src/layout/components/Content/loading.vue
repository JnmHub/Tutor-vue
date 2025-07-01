<script lang="ts" setup>
import { ref, watch } from 'vue'

import { cn } from '@/utils/cn'

interface Props {
    class?: string
    /**
     * @zh_CN 最小加载时间
     * @en_US Minimum loading time
     */
    minLoadingTime?: number

    /**
     * @zh_CN loading状态开启
     */
    spinning?: boolean
    /**
     * @zh_CN 文字
     */
    text?: string
}
const props = withDefaults(defineProps<Props>(), {
    minLoadingTime: 50,
    text: ''
})
defineOptions({
    name: 'JnmLoading'
})

// const startTime = ref(0);
const showSpinner = ref(false)
const timer = ref<ReturnType<typeof setTimeout>>()

watch(
    () => props.spinning,
    show => {
        if (!show) {
            showSpinner.value = false
            clearTimeout(timer.value)
            return
        }
        timer.value = setTimeout(() => {
            showSpinner.value = true
        }, props.minLoadingTime)
    },
    {
        immediate: true
    }
)
</script>

<template>
    <div
        :class="
            cn(
                'z-100 gap-2 dark:bg-overlay bg-overlay-content absolute left-0 top-0 flex size-full flex-col items-center justify-center transition-all duration-500',
                {
                    'invisible opacity-0': !showSpinner
                },
                props.class
            )
        "
    >
        <!-- <div
        :class="
            cn(
                'gap-2 z-100 dark:bg-overlay bg-overlay-content pointer-events-none absolute left-0 flex top-0 size-full backdrop-blur-sm flex-col items-center justify-center transition-all duration-1000',
                {
                    'invisible opacity-0': !showSpinner
                },
                props.class
            )
        "
    > -->
        <span class="dot relative inline-block size-9 text-3xl">
            <i
                v-for="index in 4"
                :key="index"
                class="absolute block size-4 origin-[50%_50%] scale-75 rounded-full opacity-30 bg-primary"
            ></i>
        </span>

        <div v-if="text" class="text-primary">
            {{ text }}
        </div>
    </div>
</template>

<style scoped>
.bg-overlay-content {
    background-color: #f2f3f6; /* 半透明白色 */
}
.dark .dark\:bg-overlay {
    background-color: #0d0f12; /* 半透明黑色 */
}
.dot {
    transform: rotate(45deg);
    animation: rotate-ani 1.2s infinite linear;
}

.dot i {
    animation: spin-move-ani 1s infinite linear alternate;
}

.dot i:nth-child(1) {
    top: 0;
    left: 0;
}

.dot i:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: 0.4s;
}

.dot i:nth-child(3) {
    right: 0;
    bottom: 0;
    animation-delay: 0.8s;
}

.dot i:nth-child(4) {
    bottom: 0;
    left: 0;
    animation-delay: 1.2s;
}

@keyframes rotate-ani {
    to {
        transform: rotate(405deg);
    }
}

@keyframes spin-move-ani {
    to {
        opacity: 1;
    }
}
</style>
