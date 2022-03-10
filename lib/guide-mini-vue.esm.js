function isObject(val) {
    return val !== null && (typeof val === 'object');
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el
};
const publicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        //setupState
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
    };
    return component;
}
function setupComponent(instance) {
    //TODO
    //initProps()
    //initSlots()
    setupStatefulComponent(instance);
}
// component -> vnode -> instance
function setupStatefulComponent(instance) {
    const Component = instance.type;
    instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);
    const { setup } = Component;
    if (setup) {
        //如果返回function 就是一个render函数 or Object 注册到组件上下文
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    //function Object
    //TODO function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    if (Component.render) {
        instance.render = Component.render;
    }
}

function render(vnode, container) {
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
    }
    else if (isObject(vnode.type)) {
        processComponent(vnode, container);
    }
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(initialVNode, container) {
    //TODO
    const instance = createComponentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.type));
    const { children } = vnode;
    //处理elment的属性
    const { props } = vnode;
    for (const key in props) {
        el.setAttribute(key, props[key]);
    }
    //children string or Array
    if (typeof children === "string") {
        el.textContent = children;
    }
    else if (Array.isArray(children)) {
        //递归创建当前elment的字元素
        mountChildren(vnode, el);
    }
    //最后添加到父级容器上
    container.append(el);
}
function mountChildren(vnode, container) {
    for (const child of vnode.children) {
        patch(child, container);
    }
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    //vnode(component)->patch
    //vnode(element) ->mountEleTment
    patch(subTree, container);
    initialVNode.el = subTree.el;
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        el: null
    };
    return vnode;
}

function creatApp(rootComponent) {
    return {
        mount(rootContainer) {
            //先转换为vnode
            // component -> vnode
            //所有逻辑操作 都基于vnode处理
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { creatApp, h };
