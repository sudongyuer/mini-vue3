import {watchEffect,reactive}from './core/reactivity/reactivity.js'

// const a = reactive({
//     uname:"sudongyu"
// })
// window.a=a
// watchEffect(()=>{
//     document.body.innerText=''
//     document.body.innerText=a.uname
// })


export default {
    render(context){
        //构建视图     
        // watchEffect(()=>{
            // document.body.innerHTML=``
            const div = document.createElement('div')
            div.innerText=context.state.uname
            return div
            // document.body.appendChild(div)
        // })
    },
    setup() {
        //响应式数据
        const state = reactive({
            uname:'sudongyu🐳'
        })
        window.state=state
        return {state}
    }
}

// App.render(App.setup())