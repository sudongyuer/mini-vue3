import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { publicInstanceProxyHandlers } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props:{},
    emit:()=>{}
  };
  component.emit = emit.bind(null,component) as any
  return component;
}

export function setupComponent(instance) {
  //TODO
  initProps(instance,instance.vnode.props);
  //initSlots()
  setupStatefulComponent(instance);
}
// component -> vnode -> instance
function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  instance.proxy = new Proxy(
    {_:instance},publicInstanceProxyHandlers
  );
  const { setup } = Component;

  if (setup) {
    //如果返回function 就是一个render函数 or Object 注册到组件上下文
    const setupResult = setup(shallowReadonly(instance.props),{
      emit:instance.emit,
    });
    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance, setupResult: any) {
  //function Object
  //TODO function

  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (Component.render) {
    instance.render = Component.render;
  }
}
