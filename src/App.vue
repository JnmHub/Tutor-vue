<template>
  <div class="h-full w-full" :class="theme === null ? '' : 'dark'">
    <n-config-provider :theme="theme">
      <n-dialog-provider>
        <n-message-provider :placement="Placement">
          <n-modal-provider>
            <router-view></router-view>
          </n-modal-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-config-provider>
  </div>
</template>
<script lang="ts" setup>
import { Placement } from "@/hooks/useMessageHooks";
import { theme } from "./hooks/useConfigHook";
</script>
