import { h } from "../../lib/guide-mini-vue.esm.js";
export const App = {
  //必须要写 render
  render() {
    // ui
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
      },
      "hi, " + this.msg
      // [h("p",{class:"red"},"hi"),h("p",{class:"green"},"mini-vue")]
    );
  },
  setup() {
    // composition api
    return {
      msg: "sudongyuer",
    };
  },
};
