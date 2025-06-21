<template>
  <n-layout class="main-layout" has-sider>
    <n-drawer v-model:show="isDrawerActive" :width="200" placement="left">
      <n-layout-sider
          bordered
          :width="200"
          :native-scrollbar="false"
          class="drawer-sider"
      >
        <div class="logo-section-drawer">
          <img src="@/assets/logo.svg" alt="logo" class="logo-img"/>
          <!-- <h1 class="logo-title">My Admin</h1> -->
        </div>
        <LayoutSider/>
      </n-layout-sider>
    </n-drawer>
    <n-layout-sider
          bordered
          show-trigger
          collapse-mode="width"
          :collapsed-width="64"
          :width="200"
          :native-scrollbar="false"
          v-model:collapsed="collapsed"
          class="desktop-sider"
      >
      <div class="logo-section-drawer">
          <img src="@/assets/logo.svg" alt="logo" class="logo-img"/>
          <h1 class="logo-title" v-show="!collapsed">My Admin</h1>
        </div>
        <LayoutSider :collapsed="collapsed"/>
      </n-layout-sider>
    


    <n-layout >
      <n-layout-header bordered class="layout-header">
      <LayoutHeader @toggle-drawer="isDrawerActive = true"/>
    </n-layout-header>
      <n-layout class="content-layout" :native-scrollbar="false" content-class="content-flex">
        <n-layout-content class="layout-content"  :native-scrollbar="false" content-class="h-full">
          <LayoutContent/>
        </n-layout-content>
        <n-layout-footer bordered class="layout-footer" >
          <LayoutFooter/>
        </n-layout-footer>
      </n-layout>

    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import LayoutHeader from './components/Header.vue';
import LayoutSider from './components/Sider.vue';
import LayoutContent from './components/Content.vue';
import LayoutFooter from './components/Footer.vue';

const collapsed = ref(false);
const isDrawerActive = ref(false);
</script>

<style scoped>
.main-layout {
  height: 100%;
  display: flex;
  flex-direction: row;
}


.content-layout{
  height: calc(100% - 64px);
}
.layout-header {
  height: 64px;
}

.layout-content {
  background-color: #f0f2f5;
  padding: 10px;
  flex-grow: 1; /* 关键：让内容区撑满剩余空间 */
  overflow-y: auto; /* 内容溢出时滚动 */
}

.dark .layout-content {
  background-color: #101014;
}

.layout-footer {
  width: 100%;
  flex-shrink: 0; /* 防止页脚被压缩 */
  align-self: flex-end;
}

.desktop-sider {
  display: block;
}

.drawer-sider {
  height: 100%;
}

.logo-section-drawer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  height: 64px;
}

.logo-img {
  width: 32px;
  height: 32px;
}

.logo-title {
  font-size: 18px;
  margin-left: 10px;
  font-weight: bold;
}

/* 移动端隐藏桌面侧边栏 */
@media (max-width: 767px) {
  .desktop-sider {
    display: none;
  }
}
</style>