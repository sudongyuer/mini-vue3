export const extend = Object.assign
  export function isObject(val){
      return val!==null &&(typeof val === 'object')
  }

  export const hasChanged=(val,newValue)=>{
    return !Object.is(val,newValue)
  }

  export const hasOwn = (val,key)=>Object.prototype.hasOwnProperty.call(val,key);

  export const camelize = (str)=>{
    return str.replace(/-(\w)/g,(_,p)=>{
      return p ? p.toUpperCase() : ''
    })
  }
  //去掉首字母
  export const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
  export const toHandlerKey =(str)=>{
    return  str ? "on" + capitalize(str) : ""
  }
