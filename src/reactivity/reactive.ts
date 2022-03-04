import { mutableHandler, readonlyHandler } from "./baseHandlers";

export const enum ReactiveFlags{
  IS_REACTIVE="is_reactive",
  IS_READONLY="is_readonly"
}

export function reactive(raw) {
  return creatActiveObject(raw, mutableHandler);
}
export function readonly(raw) {
  return creatActiveObject(raw, readonlyHandler);
}
function creatActiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]
}
