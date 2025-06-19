const modulesFiles = import.meta.glob('./*/*.vue', { eager: true });

const modules: { [key: string]: any } = {};
for (const key in modulesFiles) {
  const moduleName = key.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const value = modulesFiles[key] as { default: any };
  modules[moduleName] = value.default;
}

export default modules;
