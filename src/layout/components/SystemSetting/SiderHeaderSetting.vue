<template>
    <div
        class="my-1 flex w-full items-center justify-between rounded-md px-2 py-2.5 mt-6 hover:bg-accent"
    >
        <span class="flex items-center text-sm">{{ text }}</span>
        <n-switch v-model:value="active" @update:value="handleChange" />
    </div>
</template>

<script setup lang="ts">
type ThemeItem = 'sidebarLocal' | 'headerLocal'
interface Props {
    name: ThemeItem
}
const props = withDefaults(defineProps<Props>(), {
    name: 'sidebarLocal'
})

const text = ref('')
const active = ref(false)
const handleChange = (val: boolean) => {
    if (props.name === 'sidebarLocal') {
        preferences.theme.sidebarLocal.type = val ? 'dark' : undefined
    } else if (props.name === 'headerLocal') {
        preferences.theme.headerLocal.type = val ? 'dark' : undefined
    }
}
onMounted(() => {
    text.value = preferences.theme[props.name].name
    active.value = preferences.theme[props.name].type === 'dark'
})
</script>

<style scoped></style>
