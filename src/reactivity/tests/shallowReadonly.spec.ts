import { isReadonly, shallowReactive } from "../reactive";

describe("shallowReadonly",()=>{
    test("should not make non-reactive properties reactive",()=>{
        const props = shallowReactive({n:{foo:1}});
        expect(isReadonly(props)).toBe(true)
        expect(isReadonly(props.n)).toBe(false)
    })
})