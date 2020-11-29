import {all} from ".."


describe("testing all", () => {
  it("returns false for an empty array", () => {
    expect(all([])).toBe(false)
  })

  it("returns false for a 1 false array", () => {
    expect(all([false])).toBe(false)
  })

  it("returns true for a 1 true array", () => {
    expect(all([true])).toBe(true)
  })

  it("returns true if all true", () => {
    expect(all([true, true, true])).toBe(true)
  })

  it("returns false if any true", () => {
    expect(all([true, false, true])).toBe(false)
  })
})