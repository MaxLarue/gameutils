import {sum} from ".."


describe("testing sum function", () => {
  it("returns 0 for empty arrays", () => {
    expect(sum([])).toBe(0)
  })

  it("returns the element for single element array", () => {
    expect(sum([2])).toBe(2)
  })

  it("returns the sum", () => {
    expect(sum([2, 3])).toBe(5)
  })

  it("works with negative numbers", () => {
    expect(sum([2, -3, 5])).toBe(4)
  })
})