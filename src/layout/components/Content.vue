<template>
  <router-view v-if="!isIframe" v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
  <div v-else class="iframe-container">
    <iframe :src="iframeUrl"  class="iframe-content"></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isIframe = computed(() => route.meta && !!route.meta.iframeUrl && !route.meta.blank);
const iframeUrl = computed(() => (route.meta.iframeUrl as string) || '');
</script>

<style scoped>
.iframe-container {
  width: 100%;
  max-height: 99%;
  height: 100%;

}
.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
}

/* 路由过渡动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: opacity 0.2s;
}
.fade-transform-enter-from,
.fade-transform-leave-to {
  opacity: 0;
}
</style>