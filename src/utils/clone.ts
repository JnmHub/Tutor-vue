export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const clone: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = cloneDeep(obj[key]);
    }
  }
  return clone;
}
