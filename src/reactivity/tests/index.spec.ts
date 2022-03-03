import { add } from "."
import { effect } from "../effect"

it("init",()=>{
    expect(true).toBe(true)
})

it("esm test",()=>{
    expect(add(1,2)).toBe(3)
})

it("should return runner when run effect",()=>{
    let foo = 10;
   const runner= effect(()=>{
        foo++
        return "foo"
    })
    expect(foo).toBe(11);
    const r  = runner()
    expect(foo).toBe(12)
    expect(r).toBe("foo")
})