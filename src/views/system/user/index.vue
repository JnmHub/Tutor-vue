<template>
    <div>
        <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
        <div class="p-24 text-center">
            <h1 class="text-3xl font-bold text-blue-600">Tailwind CSS 已成功安装!</h1>
            <p class="mt-4 text-gray-600">这是一个 Vue3 + TypeScript + Tailwind CSS 项目</p>
        </div>
    </div>
</template>

<script lang="ts" name="SystemUser" setup>
import type { FormInst } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { defineComponent, ref } from 'vue'
const demo = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
}
const formValue = ref({
    user: {
        name: '',
        age: ''
    },
    phone: ''
})
onMounted(async () => {
    console.log('用户okok')
})
</script>
