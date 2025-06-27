import { useUserStore } from "@/stores/userStore";
/**
 * 状态管理钩子函数
 * @returns {Object} 返回状态管理相关方法对象
 * @returns {Function} user - 用户状态管理方法
 */
export function useStoreHook() {
  return {
    user: useUserStore,
  };
}
