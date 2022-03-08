import { render } from "./render";
import { createVNode } from "./vnode"

export function creatApp(rootComponent){
    return {
        mount(rootContainer){
            //先转换为vnode
            // component -> vnode
            //所有逻辑操作 都基于vnode处理

            const vnode = createVNode(rootComponent)

            render(vnode,rootContainer);
        }
    }
}

