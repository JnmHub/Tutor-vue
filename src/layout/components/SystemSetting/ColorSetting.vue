<template>
    <div
        class="color-wrapper"
        v-if="color"
        :class="{ selected: selected }"
        :style="{ 'background-color': color }"
    ></div>
</template>

<script setup lang="ts">
interface Props {
    selected: boolean
    color: string
}
withDefaults(defineProps<Props>(), {
    selected: false,
    color: ''
})
</script>

<style scoped>
.color-wrapper {
    width: 30px;
    height: 24px;
    border-radius: 5px;
    border: 1px solid #c1c1c1;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px #0000001a;
}
.selected::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: var(--color-primary);
    text-align: center;
    margin: 30px auto 0px;
    border-radius: 50%;
}
</style>
