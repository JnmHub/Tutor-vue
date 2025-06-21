// 1. glob 模式匹配当前目录下的 .ts 文件
const modulesFiles = import.meta.glob('./*.ts', { eager: true });

// 定义模块类型，使用Record实用类型
type ModuleType = Record<string, any>;

const modules: ModuleType = {};
for (const key in modulesFiles) {
  // 2. 使用更精确的正则表达式来提取文件名
  // 将 './dialog.ts' 转换为 'dialog'
  const moduleName = key.replace(/^\.\/([^.]+)\.ts$/, '$1');
  const value = modulesFiles[key] as ModuleType;
  if (value) {
    for (const exportKey in value) {
      modules[exportKey] = value[exportKey];
    }
  }
}
export default modules;