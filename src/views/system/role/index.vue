<template>
    <div>
        <pre style="overflow: auto">{{ themeVars }}</pre>
    </div>
</template>

<script setup lang="ts" name="SystemRole">
import { useThemeVars } from 'naive-ui'
import { defineComponent } from 'vue'
const http = useHttpHook()
const themeVars = useThemeVars()
</script>
