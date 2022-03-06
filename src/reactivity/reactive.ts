import { mutableHandler, readonlyHandler, shallowReadonlyHandlers } from "./baseHandlers";

export const enum ReactiveFlags{
  IS_REACTIVE="is_reactive",
  IS_READONLY="is_readonly"
}

export function reactive(raw) {
  return creatReactiveObject(raw, mutableHandler);
}
export function readonly(raw) {
  return creatReactiveObject(raw, readonlyHandler);
}
function creatReactiveObject(raw: any, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]
}
export function shallowReactive(raw){
  return creatReactiveObject(raw,shallowReadonlyHandlers)
}