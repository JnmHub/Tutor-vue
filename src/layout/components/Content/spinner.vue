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
}

defineOptions({
    name: 'VbenSpinner'
})

const props = withDefaults(defineProps<Props>(), {
    minLoadingTime: 50
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

        // startTime.value = performance.now();
        timer.value = setTimeout(() => {
            // const loadingTime = performance.now() - startTime.value;
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
                'flex-center z-100 bg-overlay-content absolute left-0 top-0 size-full backdrop-blur-sm transition-all duration-1000',
                {
                    'invisible opacity-0': !showSpinner
                },
                props.class
            )
        "
    >
        <div class="loader"></div>
    </div>
</template>

<style scoped>
.loader {
    position: relative;
    width: 48px;
    height: 48px;
}

.loader::before {
    position: absolute;
    top: 60px;
    left: 0;
    width: 48px;
    height: 5px;
    content: '';
    background: hsl(var(--primary, 210 100% 50%) / 50%);
    border-radius: 50%;
    animation: shadow-ani 0.5s linear infinite;
}

.loader::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: hsl(var(--primary, 210 100% 50%));
    border-radius: 4px;
    animation: jump-ani 0.5s linear infinite;
}

@keyframes jump-ani {
    15% {
        border-bottom-right-radius: 3px;
    }

    25% {
        transform: translateY(9px) rotate(22.5deg);
    }

    50% {
        border-bottom-right-radius: 40px;
        transform: translateY(18px) scale(1, 0.9) rotate(45deg);
    }

    75% {
        transform: translateY(9px) rotate(67.5deg);
    }

    100% {
        transform: translateY(0) rotate(90deg);
    }
}

@keyframes shadow-ani {
    0%,
    100% {
        transform: scale(1, 1);
    }

    50% {
        transform: scale(1.2, 1);
    }
}
</style>
