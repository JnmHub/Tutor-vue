<template>
    <div class="tabs-view-container">
      <n-icon class="arrow-icon" size="20" @click="scroll('left')" >
        <ChevronBackOutline />
      </n-icon>
  
      <div class="tabs-wrapper" ref="tabsWrapperRef">
        <draggable
          v-model="tabsStore.tabsList"
          item-key="path"
          class="tabs-draggable-list"
          @end="onDragEnd"
        >
          <template #item="{ element: tab }">
            <div style="display: inline-block;" :ref="(el:any) => setTabRef(el, tab.path)">
              <n-el
              tag="div"
              class="tab-item"
              :class="{ 'is-active': route.fullPath === tab.path }"
              @click="handleTabClick(tab.path)"
              @contextmenu.prevent="(e:any) => handleContextMenu(e, tab)"
              @mouseenter="closeIconEnter"
              @mouseleave="closeIconLeave"
            >
              <span class="tab-title">
               
                  {{ tab.title }}
                </span>
              <n-icon
                v-if="tab.closable"
                class="close-icon"
                @click.stop="tabsStore.removeTab(tab.path)"
              >
                <CloseOutline />
              </n-icon>
            </n-el>
            </div>
            
          </template>
        </draggable>
      </div>
  
      <n-icon class="arrow-icon" size="20" @click="scroll('right')">
        <ChevronForwardOutline />
      </n-icon>
  
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon class="arrow-icon refresh-icon" size="20" @click="tabsStore.refreshPage(route.fullPath)">
            <RefreshOutline />
          </n-icon>
        </template>
        刷新页面
      </n-tooltip>
  
      <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="dropdownX"
        :y="dropdownY"
        :options="contextMenuOptions"
        :show="showDropdown"
        @select="handleContextMenuSelect"
        @clickoutside="showDropdown = false"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted, nextTick, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useTabsViewStore, type Tab } from '@/stores/tabsViewStore';
  import Draggable from 'vuedraggable';
  import {
    CloseOutline,
    ChevronBackOutline,
    ChevronForwardOutline,
    RefreshOutline
  } from '@vicons/ionicons5';
  
  const route = useRoute();
  const router = useRouter();
  const tabsStore = useTabsViewStore();
  
  const tabsWrapperRef = ref<HTMLElement | null>(null);
  const tabRefs = ref<Map<string, HTMLElement>>(new Map());
  const showArrows = ref(false);
  
  // 右键菜单相关状态
  const showDropdown = ref(false);
  const dropdownX = ref(0);
  const dropdownY = ref(0);
  const currentContextMenuTab = ref<Tab | null>(null);
  
  const contextMenuOptions = computed(() => [
    { label: '刷新', key: 'refresh', disabled: route.fullPath !== currentContextMenuTab.value?.path },
    { label: '关闭', key: 'close', disabled: !currentContextMenuTab.value?.closable },
    { label: '关闭其他', key: 'close-others' },
    { label: '关闭所有', key: 'close-all' },
  ]);
  
  
  const setTabRef = (el: any, path: string) => {
    
    if (el) {
      tabRefs.value.set(path, el);
    } else {
      tabRefs.value.delete(path);
    }
  };
  const closeIconEnter = (e:any) => {
    const closeIcon = e.target.querySelector('.close-icon');
    if (closeIcon) {
      closeIcon.style.width = '16px';
    }
  }
  const closeIconLeave = (e:any) => {
    const closeIcon = e.target.querySelector('.close-icon');
    if (closeIcon) {
      closeIcon.style.width = '0';
    }
  }
  const checkScroll = () => {
    nextTick(() => {
      const wrapper = tabsWrapperRef.value;
      if (wrapper) {
        showArrows.value = wrapper.scrollWidth > wrapper.clientWidth;
      }
    });
  };
  
  const scrollToActiveTab = () => {
    nextTick(() => {
        const wrapper = tabsWrapperRef.value;
        console.log(route.fullPath);
        
        const activeTabEl = tabRefs.value.get(route.fullPath);
  
        if (!wrapper || !activeTabEl) return;
  
        const wrapperRect = wrapper.getBoundingClientRect();
        const activeTabRect = activeTabEl.getBoundingClientRect();
  
        if (activeTabRect.left >= wrapperRect.left && activeTabRect.right <= wrapperRect.right) {
          return;
        }
  
        wrapper.scrollTo({
          left: activeTabEl.offsetLeft - (wrapper.clientWidth - activeTabEl.clientWidth) / 2,
          behavior: 'smooth'
        });
    });
  };
  
  const handleTabClick = (path: string) => {
    router.push(path);
  };
  
  const onDragEnd = () => {
    // console.log(tabsStore.tabsList);
    
    // 可以在这里持久化排序后的 tabsList
  };
  
  const handleContextMenu = (e: MouseEvent, tab: Tab) => {
    showDropdown.value = false;
    nextTick().then(() => {
      showDropdown.value = true;
      dropdownX.value = e.clientX;
      dropdownY.value = e.clientY;
      currentContextMenuTab.value = tab;
    });
  };
  
  const handleContextMenuSelect = (key: 'refresh' | 'close' | 'close-others' | 'close-all') => {
    showDropdown.value = false;
    const tab = currentContextMenuTab.value;
    if (!tab) return;
  
    switch (key) {
      case 'refresh':
        tabsStore.refreshPage(tab.path);
        break;
      case 'close':
        tabsStore.removeTab(tab.path);
        break;
      case 'close-others':
        tabsStore.closeOtherTabs(tab.path);
        break;
      case 'close-all':
        tabsStore.closeAllTabs();
        break;
    }
  };
  
  const scroll = (direction: 'left' | 'right') => {
      const wrapper = tabsWrapperRef.value;
      if (!wrapper) return;
      const scrollAmount = wrapper.clientWidth / 2;
      wrapper.scrollTo({
          left: wrapper.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
          behavior: 'smooth'
      });
  }
  
  watch(
    () => route.fullPath,
    (to, from) => {
      tabsStore.addTab(route);
      scrollToActiveTab();
    },
    { immediate: true }
  );
  
  watch(() => tabsStore.tabsList.length, checkScroll);
  
  onMounted(checkScroll);
  
  </script>
  
  <style scoped>
  .demo{
    color: var(--primary-color);
    transition: 0.3s var(--cubic-bezier-ease-in-out);
  }
  .tabs-view-container {
    display: flex;
    align-items: center;
    padding: 6px 0;
    height: 44px;
    box-sizing: border-box;
    background-color: var(--base-color);
    transition: var(--jnm-naive-transition);
  }

  .arrow-icon {
    cursor: pointer;
    padding: 0 5px;
    width: 30px;
  }
  .refresh-icon {
    margin-left: 5px;
  }
  
  .tabs-wrapper {
    overflow: hidden;
    white-space: nowrap;
    padding: 0 5px;
    width: 100%;
  }
  
  .tabs-draggable-list {
    display: inline-flex;
  }
  
  .tab-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    background-color: var(--base-color);
    padding: 6px 12px;
    margin-right: 8px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    flex-shrink: 0;
    user-select: none;
  }
  .tab-item:hover {
    background-color: var(--hover-color);
  }
  
  .tab-item.is-active {
    color:var(--primary-color);
  }
  .tab-item.is-active::before{
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--primary-color);
    opacity: 0.1;
  }
  .tab-title {
    margin-right: 4px;
  }
  
  .close-icon {
    border-radius: 50%;
    width: 0;
    font-size: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0); /* 默认缩小到 0 */
    transition: all 0.2s ease-in-out;
  }
  .tab-item:hover .close-icon {
    transform: scale(1); /* 悬停时恢复原大小 */
  }
  .close-icon:hover {
    color: var(--error-color);
  }
  </style>