let currentEffect
class Dep{
    constructor(value){
        this._value=value
        this.effects= new Set()
    }

    get value(){
        this.dep()
        return this._value
    }

    set value(newValue){
        this._value=newValue
        this.notify()
    }

    dep(){
        if(currentEffect){
            this.effects.add(currentEffect)
        }
    }

    notify(){
        this.effects.forEach(effect=>effect())
    }

}


export const watchEffect=(effect)=>{
currentEffect=effect
effect()
// dep.dep(effect)
currentEffect=null
}

const targetMap = new Map()

function getDep(target,key){
       //获取当前实例的depsMap
       let depsMap = targetMap.get(target)
       if(!depsMap){
            depsMap = new Map()
           targetMap.set(target,depsMap)
       }
       //获取对应实例的属性的Dep
       let dep=depsMap.get(key)
       if(!dep){
            dep = new Dep()
            depsMap.set(key,dep)
       }
       return dep
}

export function reactive(raw){
    return new Proxy(raw,{
        get(target,key){
           const dep = getDep(target,key)
            //收集依赖
            dep.dep()
            return Reflect.get(...arguments)
        },
        set(target,key,value){
            //触发依赖
            const dep = getDep(target,key)
            const result=Reflect.set(...arguments)
            dep.notify()
            return result
        }
    })
}

// const user = reactive({
//     uname:'sudongyu'
// })

// watchEffect(()=>{
//     //必须读取响应式对象的值，触发收集依赖
//     console.log("reactive======",user.uname)//这里思考一下到依赖被通知的时候，会不会再次收集依赖呢？答案不会，因为通知的时候只执行当前函数，并没有在watchEffect中，currentEffect为null，所以不会重复收集依赖
// })

// //触发依赖
// user.uname='lisi'

// user.uname='wangwu'


