/// <reference types="vite/client" />
/// <reference types="vite-plugin-app-loading/client" />
// 扩展 ImportMeta 接口
interface ImportMeta {
    readonly env: Record<string, any>
}
