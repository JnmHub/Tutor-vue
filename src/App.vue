<template>
    <div class="h-full w-full" :class="theme === null ? '' : 'dark'">
        <n-config-provider
            :theme-overrides="themeOverrides"
            :theme="theme"
            class="h-full"
            inline-theme-disabled
        >
            <n-dialog-provider>
                <n-message-provider :placement="Placement" closable>
                    <n-modal-provider>
                        <!-- 写一个layout组件 把 router-view 包裹 -->
                        <router-view></router-view>
                    </n-modal-provider>
                </n-message-provider>
            </n-dialog-provider>
        </n-config-provider>
    </div>
</template>
<script lang="ts" setup>
import { Placement } from '@/hooks/message-dialog/useMessageHooks'
import { theme } from './hooks/config/useConfigHook'
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: '#FF0000',
        primaryColorHover: '#FF0000',
        primaryColorSuppl: '#FF0000'
    },
    Button: {
        textColor: '#FF0000'
    },
    Select: {
        peers: {
            InternalSelection: {
                textColor: '#FF0000'
            }
        }
    }
    // ...
}
</script>
