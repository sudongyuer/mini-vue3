import { track, trigger } from "./effect";
const get = creatGetter(false);
const readOnlyGet = creatGetter(true);
const set = creatSetter();
function creatGetter(isReadonly) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    if (!isReadonly) {
      track(target, key);
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
      console.warn("readonly can not set")
    return true;
  },
};
