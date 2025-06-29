# Config Hooks

## 简介

`config` 目录包含与应用程序配置相关的钩子函数，主要用于管理应用的主题设置。

## 文件说明

- `useConfigHook.ts` - 提供主题配置相关的钩子函数

## 功能特性

- 自动检测并适应操作系统主题设置（亮色/暗色模式）
- 提供手动切换主题的功能
- 主题设置持久化到本地存储

## 使用示例

```typescript
import { themeOption } from '@/hooks/config/useConfigHook'

// 在组件中使用
const { setLight, setDark } = themeOption()

// 切换到亮色主题
setLight()

// 切换到暗色主题
setDark()
```

## API 参考

### themeOption

```typescript
function themeOption(): {
  setLight: () => void;
  setDark: () => void;
}
```

#### 返回值

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| setLight | `() => void` | 设置亮色主题的函数 |
| setDark | `() => void` | 设置暗色主题的函数 |

### theme

```typescript
const theme: Ref<GlobalTheme | null>
```

当前主题的响应式引用，可以在组件中直接使用。