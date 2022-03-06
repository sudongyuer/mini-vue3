import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  public __v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    // value -》 ractive
    // 1.看看value 是不是 对象
    this.dep = new Set();
  }

  get value() {
      //如果是对象，则直接返回reactvie后的proxy
    // if (isObject(this._rawValue)) {
    //   return this._value;
    // }
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    //hasChanged
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}

export function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}
export function isRef(ref){
    return !!ref.__v_isRef
}

export function unRef(ref){
    return isRef(ref) ? ref.value : ref
}

export function proxyRefs(objectWithRefs){
    return new Proxy(objectWithRefs,{
        get(target,key){
            return unRef(Reflect.get(target,key))
        },

        set(target,key,value){
            if(isRef(target[key])&& !isRef(value)){
                target[key].value = value;
            }else{
                return Reflect.set(target,key,value)
            }
            return true
        }
    })
}