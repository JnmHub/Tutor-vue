<template>
    <div>
        <n-button @click="handleConfirm">naive-ui</n-button>
        <n-button @click="success('12312')">naive-ui</n-button>
        <n-button @click="success('12312',{placement:'top'})">naive-ui</n-button>
        {{ text }}
    </div>
</template>

<script setup lang="ts">
const { showConfirm, showSuccess } = useDialogHook()
const {success} = useMessageHook()
const {user} = useStoreHook()
const http = useHttpHook()
console.log(user().role);

const text = ref('')
// 普通确认框
const handleConfirm = () => {
  showConfirm({
    title: '删除确认',
    content: '确定要删除这条数据吗？',
    positiveText: '删除',
    negativeText: '取消',
    type: 'warning',
    async ok() {
      console.log('执行删除操作')
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟异步
      
    }
  })
}

// 快捷成功提示
const handleSuccess = () => {
  showSuccess('操作已成功完成！')
}
</script>

<style lang="scss" scoped>

</style>