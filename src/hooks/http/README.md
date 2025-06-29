# HTTP Hooks

## 简介

`http` 目录包含与HTTP请求相关的钩子函数，提供了一个封装好的Axios实例，用于处理应用中的API请求。

## 文件说明

- `useHttpHook.ts` - 提供HTTP请求相关的钩子函数

## 功能特性

- 提供预配置的Axios实例
- 统一的HTTP请求接口
- 与应用其他部分的集成

## 使用示例

```typescript
import { useHttpHook } from '@/hooks/http/useHttpHook'

// 在组件中使用
const http = useHttpHook()

// 发起GET请求
async function fetchData() {
  try {
    const response = await http.get('/api/data')
    console.log(response.data)
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// 发起POST请求
async function submitData(data) {
  try {
    const response = await http.post('/api/submit', data)
    console.log(response.data)
  } catch (error) {
    console.error('提交失败:', error)
  }
}
```

## API 参考

### useHttpHook

```typescript
function useHttpHook(): AxiosInstance
```

#### 返回值

返回一个配置好的Axios实例，可以使用该实例发起各种HTTP请求。

| 方法 | 描述 |
| --- | --- |
| get(url, config) | 发起GET请求 |
| post(url, data, config) | 发起POST请求 |
| put(url, data, config) | 发起PUT请求 |
| delete(url, config) | 发起DELETE请求 |
| patch(url, data, config) | 发起PATCH请求 |

更多Axios实例的方法和配置，请参考[Axios文档](https://axios-http.com/docs/instance)。