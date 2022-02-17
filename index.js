import {watchEffect,reactive}from './core/reactivity/reactivity.js'

const a = reactive({
    uname:"sudongyu"
})
window.a=a
watchEffect(()=>{
    document.body.innerText=''
    document.body.innerText=a.uname
})