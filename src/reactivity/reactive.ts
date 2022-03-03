import { mutableHandler, readonlyHandler } from "./baseHandlers";

export function reactive(raw) {
  return creatActiveObject(raw, mutableHandler);
}
export function readonly(raw) {
  return creatActiveObject(raw, readonlyHandler);
}
function creatActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
