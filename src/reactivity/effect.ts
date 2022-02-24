class ReactiveEffect {
  private _fn: any;
  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    this._fn();
  }
}

const targetMap = new Map();
/**
 * 收集依赖
 * @param target 
 * @param key 
 */
export function track(target, key) {
  //target -> key ->dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activeEffect);
}

/**
 * 触发依赖
 * @param target 
 * @param key 
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    effect.run();
  }
}
// 全局变量，用来保存当前正在执行的effect
let activeEffect;
export function effect(fn) {
  //调用fn
  const _effect = new ReactiveEffect(fn);
 
  _effect.run();
}
