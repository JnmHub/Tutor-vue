# Message & Dialog Hooks

## 简介

`message-dialog` 目录包含与消息提示和对话框相关的钩子函数，提供了一系列用于用户交互的UI组件，如消息提示、确认对话框、通知等。

## 文件说明

- `useDialogHook.ts` - 提供对话框相关的钩子函数
- `useDiscreteHook.ts` - 提供离散式UI API的钩子函数
- `useMessageHooks.ts` - 提供消息提示相关的钩子函数

## 功能特性

### useDialogHook

- 显示确认对话框
- 支持不同类型的对话框（成功、警告、信息、错误）
- 支持异步操作和加载状态
- 可拖拽的对话框

### useDiscreteHook

- 提供离散式UI API，可在组件外部使用
- 自动适应当前主题（亮色/暗色）
- 包含消息、对话框、通知、加载条和模态框等UI组件

### useMessageHook

- 显示不同类型的消息提示（成功、错误、警告、信息、加载）
- 支持自定义消息内容和显示位置

## 使用示例

### useDialogHook

```typescript
import { useDialogHook } from '@/hooks/message-dialog/useDialogHook'

// 在组件中使用
const { showConfirm, showSuccess } = useDialogHook()

// 显示确认对话框
showConfirm({
  type: 'warning',
  title: '确认删除',
  content: '确定要删除这条记录吗？',
  positiveText: '确定',
  negativeText: '取消',
  ok: async () => {
    // 执行删除操作
    await deleteRecord()
    // 对话框会自动处理加载状态
  },
  no: () => {
    console.log('用户取消了操作')
  }
})

// 显示成功对话框
showSuccess('操作成功完成')
```

### useDiscreteHook

```typescript
import { useDiscreteHook } from '@/hooks/message-dialog/useDiscreteHook'

// 可以在任何地方使用，不需要在组件内
const { message, dialog, notification, loadingBar, modal } = useDiscreteHook()

// 显示消息
message.success('操作成功')

// 显示通知
notification.info({
  title: '系统通知',
  content: '有新的消息到达',
  duration: 3000
})

// 显示加载条
loadingBar.start()
// 完成加载
loadingBar.finish()
```

### useMessageHook

```typescript
import { useMessageHook } from '@/hooks/message-dialog/useMessageHooks'

// 在组件中使用
const { success, error, warning, info, loading } = useMessageHook()

// 显示成功消息
success('操作成功')

// 显示错误消息
error('操作失败', { duration: 5000, placement: 'top' })

// 显示警告消息
warning('请注意', { closable: true })

// 显示信息消息
info('系统通知')

// 显示加载消息
loading('正在处理...')
```

## API 参考

### useDialogHook

```typescript
function useDialogHook(): {
  showConfirm: (options: DialogOptions) => void;
  showSuccess: (content: string, title?: string) => void;
}
```

#### DialogOptions

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| type | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` | 对话框类型 |
| title | `string` | - | 对话框标题 |
| content | `string` | - | 对话框内容 |
| positiveText | `string` | `'确定'` | 确认按钮文本 |
| negativeText | `string` | `''` | 取消按钮文本 |
| draggable | `boolean` | `true` | 是否可拖拽 |
| ok | `() => Promise<void> \| void` | - | 点击确认按钮的回调函数 |
| no | `() => Promise<void> \| void` | - | 点击取消按钮的回调函数 |

### useDiscreteHook

```typescript
function useDiscreteHook(): {
  message: MessageApi;
  dialog: DialogApi;
  notification: NotificationApi;
  loadingBar: LoadingBarApi;
  modal: ModalApi;
}
```

### useMessageHook

```typescript
function useMessageHook(): {
  success: (content: string, options?: MessageOptions_) => void;
  error: (content: string, options?: MessageOptions_) => void;
  warning: (content: string, options?: MessageOptions_) => void;
  info: (content: string, options?: MessageOptions_) => void;
  loading: (content: string, options?: MessageOptions_) => void;
}
```

#### MessageOptions_

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| content | `string` | 消息内容 |
| placement | `'top' \| 'bottom' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | 消息显示位置 |
| duration | `number` | 消息显示时间（毫秒） |
| closable | `boolean` | 是否可关闭 |

更多选项请参考 [Naive UI Message API](https://www.naiveui.com/zh-CN/os-theme/components/message)。