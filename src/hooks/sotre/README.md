# Store Hooks

## 简介

`sotre` 目录包含与状态管理相关的钩子函数，提供了一个统一的接口来访问应用中的各种状态存储。

## 文件说明

- `useStoreHook.ts` - 提供状态管理相关的钩子函数

## 功能特性

- 统一的状态管理接口
- 集成用户状态管理
- 可扩展的架构，方便添加新的状态管理模块

## 使用示例

```typescript
import { useStoreHook } from '@/hooks/sotre/useStoreHook'

// 在组件中使用
const { user } = useStoreHook()

// 获取用户状态管理实例
const userStore = user()

// 使用用户状态
const username = userStore.username

// 调用用户状态管理的方法
userStore.login({
  username: 'test',
  password: 'password'
})
```

## API 参考

### useStoreHook

```typescript
function useStoreHook(): {
  user: typeof useUserStore;
}
```

#### 返回值

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| user | `typeof useUserStore` | 用户状态管理的钩子函数 |

### useUserStore

用户状态管理的钩子函数，具体API请参考 `@/stores/userStore` 的实现。