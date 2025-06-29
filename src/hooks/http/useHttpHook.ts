import http from "@/utils/request";
import type { AxiosInstance } from "axios";
/**
 * HTTP请求钩子函数
 * @returns {AxiosInstance} 返回Axios实例
 */
export function useHttpHook(): AxiosInstance {
    return http
}