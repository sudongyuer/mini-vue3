import { isObject } from "../shared";
import { createComponentInstance, setupComponent } from "./component";
import { createVNode } from "./vnode";

export function render(vnode, container) {
  //patch
  patch(vnode, container);
}

function patch(vnode, container) {
  //去处理组件还是element
  //判断是不是 element
  // processElement()
  console.log(vnode.type);
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}
function mountComponent(initialVNode: any, container: any) {
  //TODO
  const instance = createComponentInstance(initialVNode);
  setupComponent(instance);
  setupRenderEffect(instance,initialVNode, container);
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el=document.createElement(vnode.type));
  const { children } = vnode;
  //处理elment的属性
  const { props } = vnode;
  for (const key in props) {
    el.setAttribute(key, props[key]);
  }
  //children string or Array
  if (typeof children === "string") {
    el.textContent = children;
  }else if(Array.isArray(children)){
    //递归创建当前elment的字元素
    mountChildren(vnode,el)
  }
  //最后添加到父级容器上
  container.append(el);
}

function mountChildren(vnode,container){
  for (const child of vnode.children) {
    patch(child,container)
}
}

function setupRenderEffect(instance: any,initialVNode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy);

  //vnode(component)->patch
  //vnode(element) ->mountEleTment
  patch(subTree, container);

  initialVNode.el = subTree.el
}