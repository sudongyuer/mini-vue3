import { extend } from "../shared";

class ReactiveEffect {
  private _fn: any;
  dep :any;
  active = true;
  onStop: any;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

/**
 *
 * 清理effect
 * @param effect
 */
function cleanupEffect(effect) {
  effect.dep.delete(effect)
  // effect.deps.forEach((dep: any) => {
  //   dep.delete(effect);
  // });
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
  if (!activeEffect) return;
  dep.add(activeEffect);
  activeEffect.dep=dep;
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
export function effect(fn, options: any = {}) {
  const { scheduler, onStop } = options;
  //调用fn
  const _effect = new ReactiveEffect(fn, scheduler);
  _effect.run();
  //extend
  extend(_effect, options);
  const runner: any = _effect.run.bind(_effect);

  runner.effect = _effect;

  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
