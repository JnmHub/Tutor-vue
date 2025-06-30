<template>
    <div>
        <div class="style-example-container">
            <div class="left" :style="backgroundStyle.left"></div>
            <div class="right">
                <div class="right-top" :style="backgroundStyle.rightTop"></div>
                <div class="right-bottom" :style="backgroundStyle.rightBottom"></div>
            </div>
        </div>
        <div
            style="font-size: 12px; text-align: center; margin-top: 10px"
            :class="{ selected: selected }"
        >
            {{ backgroundStyle.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    theme: {
        type: String,
        default: 'light'
    },
    selected: {
        type: Boolean,
        default: false
    }
})
const backgroundStyles = {
    light: {
        name: '明亮',
        left: {
            background: '0% 0% / cover rgb(255, 255, 255)'
        },
        rightTop: {
            background: 'rgb(255, 255, 255)'
        },
        rightBottom: {
            background: 'rgb(245, 245, 245)'
        }
    },
    dark: {
        name: '暗黑',
        left: {
            background: '0% 0% / cover rgb(0, 0, 0)'
        },
        rightTop: {
            background: 'rgb(0, 0, 0)'
        },
        rightBottom: {
            background: 'rgb(51, 51, 51)'
        }
    },
    system: {
        name: '跟随系统',
        left: {
            background: '0% 0% / cover rgb(255, 255, 255)'
        },
        rightTop: {
            background: 'rgb(0, 0, 0)'
        },
        rightBottom: {
            background: 'rgb(51, 51, 51)'
        }
    }
}
const backgroundStyle = computed(() => {
    return backgroundStyles[props.theme as keyof typeof backgroundStyles]
})
</script>

<style scoped>
.style-example-container {
    width: 60px;
    height: 48px;
    background-color: transparent;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
    margin: 0px auto;
    border-radius: 4px;
    .left {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        display: inline-block;
        width: 30%;
        height: 100%;
    }
    .right {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        display: inline-block;
        width: 70%;
        height: 100%;
        .right-top {
            height: 20%;
            border-top-right-radius: 4px;
        }
        .right-bottom {
            height: 80%;
            border-bottom-right-radius: 4px;
        }
    }
}
.selected::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--color-primary);
    text-align: center;
    margin: 5px auto 0px;
    border-radius: 50%;
}
</style>
