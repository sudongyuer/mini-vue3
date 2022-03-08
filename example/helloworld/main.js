import {creatApp}  from '../../lib/guide-mini-vue.esm.js'//vue3
import {App} from './App.js'

const  rootContainer = document.querySelector("#app")
creatApp(App).mount(rootContainer)