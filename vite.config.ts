import { fileURLToPath, URL } from "node:url";
import localIpPlugin from "./vite-plugin-local-ip";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar",
          ],
        },
      ],
      dts: "./auto-imports.d.ts",
      dirs: ["./src/hooks/**"],
    }),
    vueSetupExtend(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    // localIpPlugin({
    //   port: 8080, // 您后端 API 的端口
    //   path: "", // 您后端 API 的基础路径 (可选, 如果有的话)
    //   variableName: "VITE_APP_BASE_API", // 您希望设置的环境变量名
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
