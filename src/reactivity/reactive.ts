import { isObject } from "../shared";
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
  if(!isObject(raw)){
    console.warn(`target ${raw} 必须是一个对象`)
    return raw
  }
  return new Proxy(raw, baseHandlers);
}

export function isReactive(value){
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]
}
export function shallowReadonly(raw) {
  return creatReactiveObject(raw, shallowReadonlyHandlers);
}
export function shallowReactive(raw){
  return creatReactiveObject(raw,shallowReadonlyHandlers)
}
export function isProxy(value){
  return isReactive(value) || isReadonly(value)
}
