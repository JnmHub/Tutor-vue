<script setup lang="ts">
interface Props {
    height: string
}
const props = withDefaults(defineProps<Props>(), {
    height: '100%'
})
</script>

<template>
    <div style="width: 100%; height: 100%" :style="{ height: height }">
        <div style="width: 100%; height: 100%; background-color: aqua"></div>
        <div style="width: 100%; height: 100%; background-color: #ccc"></div>
    </div>
</template>

<style scoped lang="scss"></style>
