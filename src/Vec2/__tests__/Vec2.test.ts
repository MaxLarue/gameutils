import * as exceptions from "../../Exceptions"
import * as utils from "../../Utils"
import Vec2 from ".."

describe("constructor", () => {
  it("uses the args as coordinates", () => {
    const v = new Vec2(2, 3)
    expect(v.x).toBe(2)
    expect(v.y).toBe(3)
  })

  it("uses only one arg for copy constructor", () => {
    const v = new Vec2(2, 3)
    expect(new Vec2(v).x).toBe(2)
    expect(new Vec2(v).y).toBe(3)
    expect(new Vec2(v)).not.toBe(v)
  })

  it("uses only one arg for array constructor", () => {
    const v = new Vec2([2, 3])
    expect(v.x).toBe(2)
    expect(v.y).toBe(3)
  })

  it("throws otherwise", () => {
    expect(() => new Vec2([2, 3], [4, 5]))
      .toThrow(exceptions.InvalidArguments)
  })
})

describe("add", () => {
  const v1 = new Vec2(1, 2)
  const v2 = new Vec2(2, 3)
  const sum = v1.add(v2)

  it("can add 2 vectors to create a third one", () => {
    expect(sum.x).toEqual(3)
    expect(sum.y).toEqual(5)
  })

  it("works with negative number", () => {
    const v3 = new Vec2(-1, -1)
    const negSum = sum.add(v3)
    expect(negSum.x).toBe(2)
    expect(negSum.y).toBe(4)
  })

  it("created a new vector", () => {
    expect(v1).not.toBe(sum)
    expect(v2).not.toBe(sum)
  })
})

describe("sub", () => {
  const v1 = new Vec2(1, 2)
  const v2 = new Vec2(2, 4)
  const sub = v2.sub(v1)

  it("can add 2 vectors to create a third one", () => {
    expect(sub.x).toEqual(1)
    expect(sub.y).toEqual(2)
  })

  it("works with negative number", () => {
    const v3 = new Vec2(-1, -1)
    const negSub = v3.sub(sub)
    expect(negSub.x).toBe(-2)
    expect(negSub.y).toBe(-3)
  })

  it("created a new vector", () => {
    expect(v1).not.toBe(sub)
    expect(v2).not.toBe(sub)
  })
})

describe("multiply by scalar", () => {
  it("can multiply by zero", () => {
    const byZero = new Vec2(3, 4).mul(0)
    expect(byZero.x).toBe(0)
    expect(byZero.y).toBe(0)
  })

  it("can multiply by a negative number", () => {
    const byZero = new Vec2(3, 4).mul(-1)
    expect(byZero.x).toBe(-3)
    expect(byZero.y).toBe(-4)
  })

  it("can multiply by a positive number", () => {
    const byZero = new Vec2(3, 4).mul(2)
    expect(byZero.x).toBe(6)
    expect(byZero.y).toBe(8)
  })

  it("returns a copy", () => {
    const original = new Vec2 (1, 1)
    expect(original.mul(2)).not.toBe(original)
  })
})

describe("divide by scalar", () => {
  it("can divide by a positive number, without remainder", () => {
    const div = new Vec2(4, 6).div(2)
    expect(div.x).toBe(2)
    expect(div.y).toBe(3)
  })

  it("can divide by a positive number, with remainder", () => {
    const div = new Vec2(4, 5).div(2)
    expect(div.x).toBe(2)
    expect(div.y).toBe(2.5)
  })

  it("can divide by a negative number, without remainder", () => {
    const div = new Vec2(4, 6).div(-2)
    expect(div.x).toBe(-2)
    expect(div.y).toBe(-3)
  })

  it("can divide by a negative number, with remainder", () => {
    const div = new Vec2(4, 5).div(-2)
    expect(div.x).toBe(-2)
    expect(div.y).toBe(-2.5)
  })

  it("returns a copy", () => {
    const original = new Vec2(3, 5)
    expect(original.div(2)).not.toBe(original)
  })

  it("throws when dividing by zero", () => {
    expect(() => new Vec2(3, 4).div(0))
      .toThrowError(new exceptions.DivideByZeroException())
  })
})

describe("sqLen", () => {
  it("return the square of the length", () => {
    expect(new Vec2(2, 3).sqLen()).toBe(13)
  })
})

describe("len", () => {
  it("return the length of the vector", () => {
    expect(new Vec2(3, 4).len()).toBe(5)
  })
})

describe("unit", () => {
  it("return a vector of len 1, perfect diagonal", () => {
    expect(new Vec2(3, 3).unit().len()).toBe(1)
  })

  it("return a vector of len 1, vertical", () => {
    expect(new Vec2(0, 3).unit().x).toBe(0)
    expect(new Vec2(0, 3).unit().y).toBe(1)
  })

  it("return a vector of len 1, horizontal", () => {
    expect(new Vec2(4, 0).unit().x).toBe(1)
    expect(new Vec2(4, 0).unit().y).toBe(0)
  })
})


describe("testing scalar product", () => {
  it("does a regular scalar product", () => {
    expect(new Vec2(2, 3).scal(new Vec2(5, 6))).toBe(2*5+3*6)
  })

  it("is negative when two vectors are perpendicular", () => {
    expect(new Vec2(0, 1).scal(new Vec2(1, 0))).toBe(0)
  })

  it("is equivalent to the norm form", () => {
    const a = new Vec2(1, 1)
    const b = new Vec2(1, 0)
    expect(a.scal(b)).toBeCloseTo(a.len() * b.len() * Math.cos(Math.PI/4))
  })
})

describe("Testing getting the angle beteen two vectors", () => {
  it("is pi/2 for ortogonal vectors", () => {
    expect(new Vec2(1, 0).angle(new Vec2(0, 1))).toBeCloseTo(Math.PI/2)
  })
  it("is pi for opposite vectors", () => {
    expect(new Vec2(1, 1).angle(new Vec2(-1, -1))).toBeCloseTo(Math.PI)
  })
  it("is pi/4 for the main diagonal with the horizontal vectors", () => {
    expect(new Vec2(1, 1).angle(new Vec2(1, 0))).toBeCloseTo(Math.PI/4)
  })
  test("the order of the vector composition is not relevant", () => {
    const a = new Vec2(2, 3)
    const b = new Vec2(1, 9)
    expect(a.angle(b)).toBeCloseTo(b.angle(a))
  })
  test("the length of the vectors is not relevant", () => {
    const a = new Vec2(2, 3)
    const b = new Vec2(1, 9)
    expect(a.angle(b)).toBeCloseTo(b.mul(5).angle(a.mul(3)))
  })
  describe("Some automated/fuzzy tests", () => {
    const randomAngles = utils.range(100).map(() => Math.random() * Math.PI).map(a => [a])
    test.each(randomAngles)("for angle %s", angle => {
      // since we test against an horizontal positive vector, we can build
      // another vector from the angle using cos(a), -sin(a). -sin because
      // the y axes is downward, but that shouldn't cause a difference
      // also the length shouldn't matter
      const v = new Vec2(Math.cos(angle), -1 * Math.sin(angle)).mul(Math.random() * 20)
      const reference = new Vec2(1, 0).mul(Math.random() * 20)
      expect(v.angle(reference)).toBeCloseTo(angle)
      expect(reference.angle(v)).toBeCloseTo(angle)
    })
  })
})

describe("toString", () => {
  it("returns a pretty string", () => {
    expect("" + new Vec2(3, 4)).toEqual("(3, 4)")
  })
})

describe("equals", () => {
  it("is equal when both coordinates are equal", () => {
    expect(new Vec2(3, 4).equals(new Vec2(3, 4))).toBe(true)
  })

  it("is not equal when one coordinate is different", () => {
    expect(new Vec2(3, 4).equals(new Vec2(3, 5))).toBe(false)
  })

  it("is not equal when both coordinates are different", () => {
    expect(new Vec2(2, 4).equals(new Vec2(3, 5))).toBe(false)
  })
})