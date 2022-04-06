import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent,parentComponent) {
  return {
    mount(rootContainer) {
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer,parentComponent);
    },
  };
}
