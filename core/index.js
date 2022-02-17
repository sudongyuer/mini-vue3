import {watchEffect} from './reactivity/reactivity.js'
export function createApp(rootComponent){
    return {
        mount(rootContainer){
            const context = rootComponent.setup()       
            watchEffect(()=>{
                //当状体更改，重新生成视图
                document.querySelector(rootContainer).innerHTML=``
                const element = rootComponent.render(context)
                document.querySelector(rootContainer).append(element)
            })
        }
    }
}