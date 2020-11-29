import * as exceptions from "../../Exceptions"
import {assert} from ".."


describe("Testing assert function", () => {
  it("does not raise if test is positive", () => {
    assert(true)
  })

  it("raises with default message if none is provided", () => {
    expect(() => assert(false)).toThrow(exceptions.AssertionError)
    expect(() => assert(false)).toThrow("Assertion failed")
  })

  it("raises with specific message if it is provided", () => {
    expect(() => assert(false)).toThrow(exceptions.AssertionError)
    expect(() => assert(false, "my message")).toThrow("my message")
  })
})