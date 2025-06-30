<template>
    <div>
        <n-button @click="getData">获取</n-button>
        <span style="overflow: auto">{{ themeVars }}</span>
        <span style="overflow: auto">{{ themeVars }}</span>
        <span style="overflow: auto">{{ themeVars }}</span>
    </div>
</template>

<script setup lang="ts" name="SystemRole">
import { useThemeVars } from 'naive-ui'
const { success } = useMessageHook()
const http = useHttpHook()
const themeVars = ref()
const themeVars_ = useThemeVars()
const getThemeVars = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(themeVars_)
        }, 800)
    })
}
const getData = async () => {
    onLoading('请等待')
    themeVars.value = await getThemeVars()
    success('获取成功')
    onLoaded()
}
</script>
