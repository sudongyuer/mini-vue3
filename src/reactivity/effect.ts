class ReactiveEffect {
  private _fn: any;
  constructor(fn, public scheduler?) {
    this._fn = fn;
    
  }

  run() {
    activeEffect = this;
    return this._fn();
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
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
// 全局变量，用来保存当前正在执行的effect
let activeEffect;
export function effect(fn, options:any={}) {
  const scheduler = options.scheduler;
  //调用fn
  const _effect = new ReactiveEffect(fn, scheduler);

  _effect.run();

  return _effect.run.bind(_effect);
}
