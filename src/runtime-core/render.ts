import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  //patch
  patch(vnode, container);
}

function patch(vnode, container) {
  //去处理组件还是element
  //判断是不是 element
  processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}
function mountComponent(vnode: any, container: any) {
  //TODO
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance,container);
}

function setupRenderEffect(instance: any,container) {
  const subTree = instance.render();

  //vnode(component)->patch
  //vnode(element) ->mountElement
    patch(subTree,container)
}
