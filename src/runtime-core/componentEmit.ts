export const emit =(instance,event,...args)=>{

  console.log("emit",event);


  //TPP 
  //先去写一个特定的行为 =》 重构成通用的行为
  const {props} = instance

  //去掉首字母
  const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const camelize = (str)=>{
    return str.replace(/-(\w)/g,(_,p)=>{
      return p ? p.toUpperCase() : ''
    })
  }

  const toHandlerKey =(str)=>{
    return  str ? "on" + capitalize(str) : ""
  }

  const handler = props[toHandlerKey(camelize(event))]

  handler && handler(...args)
  
}
