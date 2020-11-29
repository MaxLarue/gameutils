import {any} from ".."

describe("testing any", () => {
  it("returns true for an empty array", () => {
    expect(any([])).toBe(true)
  })

  it("returns false for a false only array", () => {
    expect(any([false])).toBe(false)
  })

  it("returns false for a false only array, multiple elements", () => {
    expect(any([false, false, false])).toBe(false)
  })

  it("returns true for a true only array, multiple elements", () => {
    expect(any([true, true, true])).toBe(true)
  })

  it("returns true for a mixed array, multiple elements", () => {
    expect(any([true, false, true])).toBe(true)
  })
})