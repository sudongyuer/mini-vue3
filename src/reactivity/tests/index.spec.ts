import { add } from "../.."

it("init",()=>{
    expect(true).toBe(true)
})

it("esm test",()=>{
    expect(add(1,2)).toBe(3)
})