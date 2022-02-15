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

const watchEffect=(effect)=>{
currentEffect=effect
effect()
currentEffect=null
}

const dep = new Dep(10)
let b
const effect=()=>{
    b=dep.value+10
    console.log(b)
}
watchEffect(effect)
dep.value=20

