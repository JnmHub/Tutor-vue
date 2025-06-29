# Storage Hooks

## 简介

`storage` 目录包含与本地存储相关的钩子函数，提供了一个强大的存储管理器，用于处理 `localStorage` 和 `sessionStorage` 的操作。

## 文件说明

- `useStorageManager.ts` - 提供存储管理相关的钩子函数

## 功能特性

- 支持 `localStorage` 和 `sessionStorage`
- 键前缀支持，避免命名冲突
- 自动处理 JSON 序列化和反序列化
- 支持设置存储项的过期时间（TTL）
- 自动清理过期的存储项
- 错误处理和日志记录

## 使用示例

```typescript
import { useStorageManager } from '@/hooks/storage/useStorageManager'

// 创建一个存储管理器实例
const storage = useStorageManager()

// 或者创建一个带前缀和指定存储类型的实例
const sessionStorage = useStorageManager({
  prefix: 'app',
  storageType: 'sessionStorage'
})

// 设置一个存储项
storage.setItem('user', { id: 1, name: 'John' })

// 设置一个带过期时间的存储项（1小时后过期）
storage.setItem('token', 'abc123', 60 * 60 * 1000)

// 获取一个存储项
const user = storage.getItem('user')
console.log(user) // { id: 1, name: 'John' }

// 获取一个可能不存在的存储项，提供默认值
const settings = storage.getItem('settings', { theme: 'light' })

// 移除一个存储项
storage.removeItem('token')

// 清除所有带前缀的存储项
storage.clear()

// 清除所有过期的存储项
storage.clearExpiredItems()
```

## API 参考

### useStorageManager

```typescript
function useStorageManager(options?: StorageManagerOptions): StorageManager
```

#### StorageManagerOptions

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| prefix | `string` | `''` | 存储键的前缀 |
| storageType | `'localStorage' \| 'sessionStorage'` | `'localStorage'` | 使用的存储类型 |

### StorageManager 类

#### 方法

| 方法 | 签名 | 描述 |
| --- | --- | --- |
| getItem | `<T>(key: string, defaultValue?: T \| null): T \| null` | 获取存储项，如果不存在或已过期则返回默认值 |
| setItem | `<T>(key: string, value: T, ttl?: number): void` | 设置存储项，可选地设置过期时间（毫秒） |
| removeItem | `(key: string): void` | 移除存储项 |
| clear | `(): void` | 清除所有带前缀的存储项 |
| clearExpiredItems | `(): void` | 清除所有过期的存储项 |