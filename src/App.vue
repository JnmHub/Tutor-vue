<template>
    <div class="h-full w-full" :class="theme_?.name === 'dark' ? 'dark' : ''">
        <n-config-provider
            :theme-overrides="themeOverrides"
            :theme="theme_"
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
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { generate } from '@ant-design/colors'
const color = ref(generate(preferences.theme.primaryColor))
const theme_ = computed(() => theme.value)
const Placement = computed(() => preferences.option.message.placement)
watch(
    () => preferences.theme.primaryColor,
    newValue => {
        color.value = generate(newValue)
    }
)
/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return {
        common: {
            primaryColor: color.value[5], // 主色取第6个颜色，和传入的颜色一致
            primaryColorHover: color.value[4], // Hover和Suppl颜色一样，取第5个颜色
            primaryColorSuppl: color.value[4], // Hover和Suppl颜色一样，取第5个颜色
            primaryColorPressed: color.value[6] // 比主色深一档，取第7个颜色
        },
        Button: {
            textColor: color.value[5]
        },
        Select: {
            peers: {
                InternalSelection: {
                    textColor: color.value[5]
                }
            }
        }
        // ...
    }
})
</script>
