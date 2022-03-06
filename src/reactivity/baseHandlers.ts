import { extend, isObject } from "../shared";
import { track, trigger } from "./effect";
import { reactive, ReactiveFlags, readonly } from "./reactive";
const get = creatGetter(false);
const readOnlyGet = creatGetter(true);
const set = creatSetter();
const shallowReadonlyGet = creatGetter(true,true)
function creatGetter(isReadonly,shallow =false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    if (!isReadonly) {
      track(target, key);
    }
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    if(shallow){
      return res
    }
    //判断是否为对象
    if(isObject(res)){
      return isReadonly ? readonly(res) : reactive(res)
    }
    return res;
  };
}

function creatSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    //触发依赖
    trigger(target, key);
    return res;
  };
}

export const mutableHandler = {
  get,
  set,
};

export const readonlyHandler = {
  get: readOnlyGet,
  set(target, key, value) {
    console.warn("readonly can not set");
    return true;
  },
};

export const shallowReadonlyHandlers= extend({},readonlyHandler,{
  get:shallowReadonlyGet
})