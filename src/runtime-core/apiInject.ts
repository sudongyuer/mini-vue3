import { getCurrentInstance } from "./component";

export function provide(key, value) {

  const currentInstance: any = getCurrentInstance()

  if (currentInstance) {
    const { provides } = currentInstance
    provides[key] = value

  }

}

export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance();

  if (currentInstance) {
    // const parentProvides = currentInstance.parent.provides;

    // if (key in parentProvides) {
    //   return parentProvides[key];
    // }else if(defaultValue){
    //   if(typeof defaultValue === "function"){
    //     return defaultValue()
    //   }
    //   return defaultValue
    // }
    const parentProvides = currentInstance.parent.provides;
    return parentProvides[key]
  }
}
