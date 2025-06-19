import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("token") || "");
  const role = ref(localStorage.getItem("role") || "");
  const userInfo = ref(localStorage.getItem("userInfo") || "");
  function setToken(token_: string) {
    token_ = "Bearer " + token_;
    localStorage.setItem("token", token_);
    token.value = token_;
  }
  function setRole(role_: string) {
    localStorage.setItem("role", role_);
    role.value = role_;
  }
  function setUserInfo(userInfo_: string) {
    userInfo_ = JSON.stringify(userInfo_);
    userInfo.value = userInfo_;
    localStorage.setItem("userInfo", userInfo_);
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userInfo");
    token.value = "";
    role.value = "";
  }
  const isLogin = computed(() => token.value !== "");
  const getUserInfo = computed(() => JSON.parse(userInfo.value));
 
  return {
    token,
    role,
    setToken,
    setRole,
    logout,
    setUserInfo,
    isLogin,
    getUserInfo,
  };
});
