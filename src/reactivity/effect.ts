import { extend } from "../shared";

// 全局变量，用来保存当前正在执行的effect
let activeEffect;
//全局变量 是否收集依赖
let shouldTrack;
export class ReactiveEffect {
  private _fn: any;
  dep: any;
  active = true;
  onStop: any;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  run() {
    if (!this.active) {
      return this._fn();
    }
    shouldTrack = true;
    activeEffect = this;
    const result = this._fn();
    shouldTrack = false;
    return result;
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
  effect.dep.delete(effect);
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
  if (!shouldTrack) return;
  trackEffects(dep)
}

export function trackEffects(dep){
  if(dep.has(activeEffect)) return 
  dep.add(activeEffect);
  activeEffect.dep = dep;
}

/**
 * 触发依赖
 * @param target
 * @param key
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  triggerEffects(dep)
} 

export function isTracking(){
  return shouldTrack && activeEffect !== undefined
}

export function triggerEffects(dep){
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

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
