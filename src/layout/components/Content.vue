<template>
  <router-view v-slot="{ Component, route }">
    <div class="content-main">
      <transition v-show="!isIframe" name="fade-transform" mode="out-in">
        <keep-alive :include="tabsStore.cachedRoutes.join(',')">
          <component
            @vue:mounted="mounted"
            :is="Component"
            :key="route.name"
            v-if="!tabsStore.isRefreshing && !isIframe"
          />
        </keep-alive>
      </transition>
      <div
        v-if="!tabsStore.isRefreshing && isIframe"
        class="iframe-container"
        :style="iframeStyle"
      >
        <hIframe v-if="openIframe" />
      </div>
    </div>
  </router-view>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTabsViewStore } from "@/stores/tabsViewStore"; // 引入 store
import type { CSSProperties } from "vue";
const tabsStore = useTabsViewStore();
const openIframe = ref(false);
const route = useRoute();
const iframeStyle = computed(() => {
  return (route.meta.iframeStyle || {}) as CSSProperties;
});

const isIframe = computed(
  () => route.meta && !!route.meta.iframeUrl && !route.meta.blank
);
const iframeUrl = computed(() => (route.meta.iframeUrl as string) || "");

const hIframe = () => {
  return h(
    "iframe",
    {
      src: iframeUrl.value,
      class: "iframe-content",
    },
    {
      default: () => "加载中",
    }
  );
};
const mounted = () => {
  console.log("加载成功");
};
watch(
  () => route.meta.iframeUrl,
  (newVal) => {
    if (newVal && isIframe.value) {
      setTimeout(() => {
        openIframe.value = true;
      }, 200);
    } else {
      openIframe.value = false;
    }
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.content-main {
  padding-bottom: 10px;
  flex-grow: 1;
  height: 100%;
}
.iframe-container {
  width: 100%;
  height: 100%;
}
.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
  :deep(.el-tabs__content) {
    height: 100%;
  }
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

/* .fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s ease-in-out;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-20px);
} */
/* 路由过渡动画: 缩放 */
/* .fade-transform-enter-active {
  transition: all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}
.fade-transform-leave-active {
  transition: all 0.3s ease-out;
} */
</style>
