// vite-plugin-local-ip.ts
import ip from "ip";
import type { Plugin, UserConfig, ConfigEnv, ViteDevServer } from "vite";

// 定义插件选项的类型
interface LocalIpPluginOptions {
  port?: number;
  path?: string;
  variableName?: string;
}

// 定义插件返回类型，明确 config 和 configureServer 钩子
interface LocalIpPlugin extends Plugin {
  config?: (config: UserConfig, env: ConfigEnv) => UserConfig | void;
  configureServer?: (
    server: ViteDevServer
  ) => (() => void) | void | Promise<(() => void) | void>;
}

export default function localIpPlugin(
  options: LocalIpPluginOptions = {}
): LocalIpPlugin {
  const {
    port = 8090, // 默认端口
    path = "", // 默认路径（如果API在根路径，则为空）
    variableName = "VITE_APP_BASE_API", // 默认环境变量名
  } = options; // 解构时应用默认值

  return {
    name: "vite-plugin-local-ip", // 插件名称，必须
    config(config: UserConfig, { command }: ConfigEnv): UserConfig | void {
      // command 可以是 'serve' 或 'build'
      // 仅在开发服务器启动时 (serve) 设置该环境变量
      if (command === "serve") {
        const localIp: string = ip.address(); // ip.address() 返回 string
        const basePath: string = path.startsWith("/")
          ? path
          : path
          ? `/${path}`
          : ""; // 确保 basePath 不会是 '//' 或以 '/' 结尾的空串
        const apiUrl: string = `http://${localIp}:${port}${basePath}`;

        console.log(`[Local IP Plugin] Setting ${variableName} to: ${apiUrl}`);

        // Vite 环境变量需要以 'VITE_' 开头才能通过 import.meta.env 暴露给客户端代码
        if (!variableName.startsWith("VITE_")) {
          console.warn(
            `[Local IP Plugin] Environment variable "${variableName}" does not start with "VITE_". It will not be exposed to client-side code via import.meta.env.`
          );
        }

        // 更新 define 配置
        const currentDefine = config.define || {};
        config.define = {
          ...currentDefine,
          [`import.meta.env.${variableName}`]: JSON.stringify(apiUrl),
        };
        console.log(config.define);

        // 直接返回修改后的部分或整个config对象，或者不返回（直接修改引用）
        // Vite 插件规范建议返回一个部分配置对象，Vite 会将其合并。
        // 但在这个例子中，我们直接修改了传入的 config 对象的 define 属性，
        // 如果不返回任何东西，Vite 也会使用修改后的 config。
        // 为了更明确，可以返回包含 define 的对象：
        return {
          define: {
            ...currentDefine, // 保留原有的 define
            [`import.meta.env.${variableName}`]: JSON.stringify(apiUrl),
          },
        };
      }
      // 在构建时不进行任何操作
      // return {}; // 返回空对象或者不返回都可以
    },
    // 可选：在服务器启动后打印信息
    configureServer(server: ViteDevServer) {
      const localIp: string = ip.address();
      const basePath: string = path.startsWith("/")
        ? path
        : path
        ? `/${path}`
        : "";
      const apiUrl: string = `http://${localIp}:${port}${basePath}`;
      console.log(`[Local IP Plugin] API URL for development: ${apiUrl}`);
      console.log(
        `[Local IP Plugin] Your application can access this via import.meta.env.${variableName}`
      );
    },
  };
}
