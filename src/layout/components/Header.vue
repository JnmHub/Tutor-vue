<template>
  <div class="header-container">
    <div class="left-section">
      <n-icon size="24" class="hamburger" @click="toggleDrawer">
        <MenuOutline />
      </n-icon>
      <div class="breadcrumb-section">
        <n-breadcrumb>
          <n-breadcrumb-item
            v-for="item in breadcrumbs"
            :key="item.path"
            separator=">"
          >
            <div class="flex-center">
              <n-icon v-if="item.meta.icon" class="breadcrumb-icon">
                <component :is="item.meta.icon" />
              </n-icon>
              {{ item.meta.title }}
            </div>
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </div>

    <div class="right-section">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="20" @click="toggleFullScreen">
            <ExpandOutline v-if="!isFullscreen" />
            <ContractOutline v-else />
          </n-icon>
        </template>
        {{ isFullscreen ? "退出全屏" : "全屏" }}
      </n-tooltip>

      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="20" @click="toggleTheme($event)" ref="changeTheme">
            <SunnyOutline v-if="isDark" />
            <MoonOutline v-else />
          </n-icon>
        </template>
        切换{{ isDark ? "亮色" : "暗色" }}主题
      </n-tooltip>

      <n-dropdown
        trigger="hover"
        :options="userOptions"
        @select="handleUserSelect"
      >
        <n-avatar
          round
          size="medium"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  MenuOutline,
  ExpandOutline,
  ContractOutline,
  SunnyOutline,
  MoonOutline,
  LogOutOutline,
  KeyOutline,
} from "@vicons/ionicons5";
import { themeOption, theme } from "@/hooks/useConfigHook";
import { useStoreHook } from "@/hooks/useStoreHook";
import { NIcon } from "naive-ui";
import { useMessageHook } from "@/hooks/useMessageHooks.ts";

const emit = defineEmits(["toggle-drawer"]);
const { info } = useMessageHook();
const route = useRoute();
const router = useRouter();
const { setDark, setLight } = themeOption();
const userStore = useStoreHook().user();
const changeThemeRef = ref<HTMLDivElement>();

const isFullscreen = ref(document.fullscreenElement !== null);
const isDark = computed(() => theme.value?.name === "dark");

// 面包屑数据
const breadcrumbs = computed(() => {
  return route.matched.filter((item) => item.meta && item.meta.title);
});

// 切换全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullscreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullscreen.value = false;
    }
  }
};

// 切换主题
const toggleTheme = (e: MouseEvent) => {
  const x = e.clientX;
  const y = e.clientY;
  const targetRadius = Math.hypot(Math.max(x,window.innerWidth - x),Math.max(y,window.innerHeight - y));
  let clipPath: string[] = []
  const transiton = document.startViewTransition(() => {
    if (isDark.value) {
      clipPath = [`circle(${targetRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]
      setLight();
    } else {
      clipPath = [`circle(0% at ${x}px ${y}px)`, `circle(${targetRadius}px at ${x}px ${y}px)`]
      setDark();
    }
  });
  transiton.ready.then(()=>{
    document.documentElement.animate({
      clipPath:[`circle(0% at ${x}px ${y}px)`, `circle(${targetRadius}px at ${x}px ${y}px)`]
    }, {
      duration: 800,
      pseudoElement: '::view-transition-new(root)'
    });
  })
};
// const toggleTheme = (e:MouseEvent) => {
//   if (isDark.value) {
//       setLight();
//     } else {
//       setDark();
//     }
// }
// 用户下拉菜单
const userOptions = [
  {
    label: "修改密码",
    key: "changePassword",
    icon: () => h(NIcon, null, { default: () => h(KeyOutline) }),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: () => h(NIcon, null, { default: () => h(LogOutOutline) }),
  },
];

const handleUserSelect = (key: string) => {
  if (key === "logout") {
    userStore.logout();
    router.push("/login");
  } else {
    // 提示功能待开发
    info("功能待开发");
  }
};

const toggleDrawer = () => {
  emit("toggle-drawer");
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.left-section,
.breadcrumb-section,
.right-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.left-section {
  flex-shrink: 0;
}

.breadcrumb-section {
  flex-grow: 1;
  justify-content: center;
  display: none; /* 在移动端默认隐藏面包屑 */
}

.right-section {
  flex-shrink: 0;
}

.hamburger {
  cursor: pointer;
  margin-right: 15px;
  display: block;
}

.logo-section {
  display: flex;
  align-items: center;
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

.breadcrumb-icon {
  vertical-align: middle;
  margin-right: 5px;
}

.n-icon {
  cursor: pointer;
}

/* 桌面端样式 */
@media (min-width: 768px) {
  .hamburger {
    display: none;
  }

  .breadcrumb-section {
    display: flex;
  }
}
</style>
