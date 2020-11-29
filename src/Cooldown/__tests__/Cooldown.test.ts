import Cooldown from ".."


describe("testing cooldown", () => {
  it("takes a time parameter", () => {
    const cooldown = new Cooldown(300)
    expect(cooldown.time).toBe(300)
  })
  it("can receveive delta (of time)", () => {
    const cooldown = new Cooldown(300)
    cooldown.addDelta(100)
    expect(cooldown.elapsed).toBe(100)
  })
  it("can tell us if it is ready (default true)", () => {
    const cooldown = new Cooldown(300)
    expect(cooldown.ready).toBe(true)
  })
  it("can only be activated once per {time}", () => {
    const cooldown = new Cooldown(300)
    cooldown.activate()
    expect(cooldown.ready).toBe(false)
  })
  it("can cool down the be activated again", () => {
    const cooldown = new Cooldown(300)
    cooldown.activate()
    expect(cooldown.ready).toBe(false)
    cooldown.addDelta(300)
    expect(cooldown.ready).toBe(true)
  })
})

describe("Some real life test", () => {
  test("real life scenarion", () => {
    const cooldown = new Cooldown(300)
    expect(cooldown.ready).toBe(true)
    cooldown.activate()
    cooldown.addDelta(100)
    expect(cooldown.ready).toBe(false)
    cooldown.addDelta(100)
    expect(cooldown.ready).toBe(false)
    cooldown.addDelta(100)
    expect(cooldown.ready).toBe(true)
    cooldown.activate()
    expect(cooldown.ready).toBe(false)
    cooldown.addDelta(100)
    expect(cooldown.ready).toBe(false)
    cooldown.addDelta(200)
    expect(cooldown.ready).toBe(true)
  })
})