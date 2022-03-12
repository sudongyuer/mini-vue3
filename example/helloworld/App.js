import { h } from "../../lib/guide-mini-vue.esm.js";
window.self = null;
export const App = {
  //必须要写 render
  render() {
    window.self = this
    // ui
    return h(
      "div",
      {
        id: "root",
        class: ["red", "hard"],
        onClick(){
          console.log('click');
        },
        onMouseMove(){
          console.log('move');
        }
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
