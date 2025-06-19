import axios from "axios";
import type { AxiosInstance } from "axios";
import { useStoreHook } from "@/hooks/useStoreHook";
import { useDiscreteHook } from "@/hooks/useDiscreteHook";
const {user:useUserStore} = useStoreHook()
const {message,dialog} = useDiscreteHook()

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000, // 请求超时时间：50s
  headers: { "Content-Type": "application/json;charset=utf-8" },
}) as AxiosInstance;

// 请求拦截器
service.interceptors.request.use(
  (config) => {

    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    // 授权认证
    config.headers["Authorization"] = useUserStore().token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  
  (response) => {
    
    if (response.config.responseType === "blob") {
      return response;
    }
    const { data, status, headers } = response;
    if (headers.Authorization) {
      useUserStore().setToken(headers.Authorization);
    }
    if (data.code === 104) {
      dialog.create({
        title: '登录失效',
        content: '您的登录账号已失效，请重新登录',
        positiveText: '再次登录',
        type: 'warning',
        onPositiveClick: () => {
          localStorage.removeItem("token");
          window.location.href = "/";
          return Promise.reject(new Error("登录失效"));
        }
      })
    } else if (data.success !== undefined && !data.success) {
      message.error(data.msg);
      return Promise.reject(new Error(data.msg));
    }
    return response.data;
  },
  (error) => {
    const no_error = error.config?.no_error;
    const data = error.response?.data;
    const code = error.response?.status;
    if (no_error) return;
    message.error(code + ":" + (data?.msg ?? data ?? "系统错误"))
    return Promise.reject(
      new Error(code + ":" + (data?.msg ?? data ?? "系统错误"))
    );
  }
);

// 导出实例
export default service;
