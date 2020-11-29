import {FListener} from ".."

class DummyEvent {
  public value: any
  constructor(value: any) {
    this.value = value
  }
}

describe("Testing FListener implementation", () => {
  it("calls our callback upon trigger", () => {
    let testVal = 5
    const listener = new FListener((e: DummyEvent) => {testVal = e.value})
    listener.onEvent(new DummyEvent(6))
    expect(testVal).toBe(6)
  })
})