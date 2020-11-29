import * as exceptions from "../../Exceptions"
import {range} from ".."

describe("testing range", () => {
  test("range(0) yields an empty list", () => {
    expect(range(0)).toEqual([])
  })

  test("range(1) yields a list of 1 0", () => {
    expect(range(1)).toEqual([0])
  })

  test("range(10) yields 9 elements", () => {
    expect(range(10)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it("throws an exception if argument is negative", () => {
    expect(() => range(-2)).toThrow(exceptions.InvalidArguments)
  })
})