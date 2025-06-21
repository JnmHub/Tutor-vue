<template>
  <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :value="activeKey"
      @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import { dynamicRoutes } from '@/router/modules/dynamicRoutes';

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
const router = useRouter();

// 检查是否为有效的外部链接
const isValidUrl = (url: string) => /^https?:\/\//.test(url);

// 将路由转换为菜单选项
const generateMenuOptions = (routes: any[]): MenuOption[] => {
  const options: MenuOption[] = [];
  for (const item of routes) {
    if (!item.meta || !item.meta.showInMenu) {
      continue;
    }

    const { title, icon } = item.meta;
    const key = item.path;

    let option: MenuOption = {
      label: title,
      key,
      icon,
      type:"router"
    };

    if (item.children && item.children.length > 0) {
      // 过滤掉不应在菜单中显示的子项
      const visibleChildren = item.children.filter((child: any) => child.meta && child.meta.showInMenu);
      if(visibleChildren.length > 0) {
        option.children = generateMenuOptions(visibleChildren);
      }
    }

    // 如果没有子菜单，或者子菜单为空，处理为可点击的顶级菜单
    if (!option.children || option.children.length === 0) {
      const { blank } = item.meta;
      option.type = blank ? "blank" : "router";
      option.label = () => {
        const { iframeUrl, blank } = item.meta;
        // 优先处理新窗口打开
        if (blank && iframeUrl && isValidUrl(iframeUrl)) {
          return h('a', { href: iframeUrl, target: '_blank', rel: 'noopener noreferrer' }, title);
        }
        // Iframe或普通路由链接
        if (iframeUrl || item.path) {
          return h(
              RouterLink,
              { to: { path: item.path } },
              { default: () => title }
          );
        }
        return title;
      }
    }
    options.push(option);
  }
  return options;
};

const menuOptions = ref(generateMenuOptions(dynamicRoutes));

// 当前激活的菜单项
const activeKey = computed(() => route.path);

// 菜单项选择事件
const handleMenuSelect = (key: string, item: MenuOption) => {
  // Naive UI的label如果是渲染函数，这里的item.key就是路由path
  item.type === "router" && router.push(key);
};
</script>