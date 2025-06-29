# Hooks 目录

## 简介

`hooks` 目录包含了应用中使用的各种Vue组合式API钩子函数（Composition API Hooks），这些钩子函数封装了特定的功能逻辑，使组件代码更加简洁和可复用。

## 目录结构

- [`config/`](./config/README.md) - 配置相关的钩子函数
- [`http/`](./http/README.md) - HTTP请求相关的钩子函数
- [`message-dialog/`](./message-dialog/README.md) - 消息提示和对话框相关的钩子函数
- [`sotre/`](./sotre/README.md) - 状态管理相关的钩子函数
- [`storage/`](./storage/README.md) - 本地存储相关的钩子函数
- [`window/`](./window/README.md) - 窗口相关的钩子函数

## 使用指南

### 配置钩子 (Config Hooks)

提供主题配置相关的功能，包括自动适应操作系统主题和手动切换主题。

```typescript
import { themeOption } from '@/hooks/config/useConfigHook'

const { setLight, setDark } = themeOption()
```

### HTTP钩子 (HTTP Hooks)

提供封装好的Axios实例，用于处理API请求。

```typescript
import { useHttpHook } from '@/hooks/http/useHttpHook'

const http = useHttpHook()
const response = await http.get('/api/data')
```

### 消息和对话框钩子 (Message & Dialog Hooks)

提供消息提示、对话框、通知等UI交互组件。

```typescript
import { useMessageHook } from '@/hooks/message-dialog/useMessageHooks'
import { useDialogHook } from '@/hooks/message-dialog/useDialogHook'

const { success, error } = useMessageHook()
const { showConfirm } = useDialogHook()

success('操作成功')
```

### 状态管理钩子 (Store Hooks)

提供统一的状态管理接口。

```typescript
import { useStoreHook } from '@/hooks/sotre/useStoreHook'

const { user } = useStoreHook()
const userStore = user()
```

### 存储钩子 (Storage Hooks)

提供本地存储管理功能。

```typescript
import { useStorageManager } from '@/hooks/storage/useStorageManager'

const storage = useStorageManager()
storage.setItem('key', value)
```

### 窗口钩子 (Window Hooks)

提供窗口尺寸相关的响应式功能。

```typescript
import { useWindowWidth } from '@/hooks/window/useWindowHook'

const { windowWidth } = useWindowWidth()
```

## 贡献指南

### 创建新的钩子函数

1. 在适当的子目录中创建新的钩子函数文件，如果现有子目录不适合，可以创建新的子目录
2. 遵循命名约定：`use[Name]Hook.ts`
3. 为钩子函数添加JSDoc注释，说明其用途、参数和返回值
4. 更新相应的README.md文件

### 钩子函数设计原则

1. **单一职责**: 每个钩子函数应该只关注一个功能点
2. **可组合性**: 钩子函数应该易于与其他钩子函数组合使用
3. **可测试性**: 钩子函数应该易于测试
4. **文档完备**: 提供清晰的文档和使用示例