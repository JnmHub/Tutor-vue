# Window Hooks

## 简介

`window` 目录包含与浏览器窗口相关的钩子函数，提供了响应式地获取和监听窗口尺寸变化的功能。

## 文件说明

- `useWindowHook.ts` - 提供窗口相关的钩子函数

## 功能特性

- 响应式地获取窗口宽度
- 自动处理事件监听的添加和移除
- 支持组件生命周期的集成

## 使用示例

```typescript
import { useWindowWidth } from '@/hooks/window/useWindowHook'

// 在组件中使用
const { windowWidth } = useWindowWidth()

// 在模板中使用
// <template>
//   <div>当前窗口宽度: {{ windowWidth }}px</div>
// </template>

// 或者在计算属性中使用
const isMobile = computed(() => windowWidth.value < 768)
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
const isDesktop = computed(() => windowWidth.value >= 1024)
```

## API 参考

### useWindowWidth

```typescript
function useWindowWidth(delay?: number): {
  windowWidth: Ref<number>;
}
```

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| delay | `number` | `300` | 防抖延迟时间（毫秒） |

#### 返回值

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| windowWidth | `Ref<number>` | 窗口宽度的响应式引用 |