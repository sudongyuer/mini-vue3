export const App = {

    render(){
        // ui
        return h("div","hi,mini-vue"+this.msg)
    },
    setup(){
        // composition api
        return {
            msg:"sudongyuer"
        }
    }
}