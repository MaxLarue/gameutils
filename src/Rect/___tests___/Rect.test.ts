import * as exceptions from "../../Exceptions"
import Rect from ".."
import Vec2 from "../../Vec2"
import Line from "../../Line"


describe("Testing the rect constructor", () => {
  it("builds a rect using top-left coordinates + size", () => {
    const rect = new Rect(2, 3, 5, 6)
    expect(rect.x).toBe(2)
    expect(rect.y).toBe(3)
    expect(rect.w).toBe(5)
    expect(rect.h).toBe(6)
  })

  it("cannot be built top-left coordinates + size if size is negative", () => {
    expect(() => new Rect(2, 3, -5, 6)).toThrow(exceptions.InvalidArguments)
  })

  it("can be built using top-left + size using static constructor", () => {
    const rect = Rect.fromTopLeft(new Vec2(2, 3), new Vec2(3, 4))
    expect(rect.x).toBe(2)
    expect(rect.y).toBe(3)
    expect(rect.w).toBe(3)
    expect(rect.h).toBe(4)
  })

  it("cannot be built top-left + size using static constructor if size is negative", () => {
    expect(() => Rect.fromTopLeft(new Vec2(2, 3), new Vec2(-5, 6)))
      .toThrow(exceptions.InvalidArguments)
  })

  it("can be built using center + size using static constructor", () => {
    const rect = Rect.fromCenter(new Vec2(2, 3), new Vec2(3, 4))
    expect(rect.x).toBe(0.5)
    expect(rect.y).toBe(1)
    expect(rect.w).toBe(3)
    expect(rect.h).toBe(4)
  })

  it("cannot be built using center + size using static constructor if size is negative", () => {
    expect(() => Rect.fromTopLeft(new Vec2(2, 3), new Vec2(-5, 6)))
      .toThrow(exceptions.InvalidArguments)
  })

  it("can be built using topLeft + bottomRight", () => {
    const rect = Rect.fromTopLeftBottomRight(new Vec2(2, 3), new Vec2(5, 6))
    expect(rect.x).toBe(2)
    expect(rect.y).toBe(3)
    expect(rect.w).toBe(3)
    expect(rect.h).toBe(3)
  })

  it("cannot be built using topLeft + bottomRight if size is negative", () => {
    expect(() => Rect.fromTopLeftBottomRight(new Vec2(3, 3), new Vec2(2, 6)))
      .toThrow(exceptions.InvalidArguments)
  })
})

describe("getting each corners + center", () => {
  const r = Rect.fromTopLeft(new Vec2(2, 3), new Vec2(5, 6))

  it("gives the top left corner", () => {
    expect(r.topLeft.x).toBe(2)
    expect(r.topLeft.y).toBe(3)
  })

  it("gives the top right corner", () => {
    expect(r.topRight.x).toBe(7)
    expect(r.topRight.y).toBe(3)
  })

  it("gives the bottom left corner", () => {
    expect(r.bottomLeft.x).toBe(2)
    expect(r.bottomLeft.y).toBe(9)
  })

  it("gives the bottom right corner", () => {
    expect(r.bottomRight.x).toBe(7)
    expect(r.bottomRight.y).toBe(9)
  })

  it("gives the center", () => {
    expect(r.center.x).toBe(4.5)
    expect(r.center.y).toBe(6)
  })

})

describe("Test flip", () => {
  it("flips the rect, keeping the same center", () => {
    const r = new Rect(2, 2, 4, 5)
    const flipped = r.flip()
    expect(flipped.x).toBe(1.5)
    expect(flipped.y).toBe(2.5)
    expect(flipped.w).toBe(5)
    expect(flipped.h).toBe(4)
  })

  test("when flipping twice it's the same rect", () => {
    const r = new Rect(2, 2, 4, 5)
    const flipped = r.flip().flip()
    expect(flipped.x).toBe(r.x)
    expect(flipped.y).toBe(r.y)
    expect(flipped.w).toBe(r.w)
    expect(flipped.h).toBe(r.h)
  })
})

describe("testing equality", () => {
  test("when x is different", () => {
    expect(new Rect(0, 0, 3, 4).equals(new Rect(1, 0, 3, 4))).toBe(false)
  })

  test("when y is different", () => {
    expect(new Rect(0, 1, 3, 4).equals(new Rect(0, 0, 3, 4))).toBe(false)
  })

  test("when w is different", () => {
    expect(new Rect(0, 0, 2, 4).equals(new Rect(0, 0, 3, 4))).toBe(false)
  })

  test("when h is different", () => {
    expect(new Rect(0, 0, 3, 4).equals(new Rect(0, 0, 3, 5))).toBe(false)
  })

  test("when they are the same", () => {
    expect(new Rect(0, 0, 3, 4).equals(new Rect(0, 0, 3, 4))).toBe(true)
  })
})

describe("testing sides getters", () => {
  const r = new Rect(2, 3, 4, 5)
  test("left", () => expect(r.left).toBe(2))
  test("right", () => expect(r.right).toBe(6))
  test("top", () => expect(r.top).toBe(3))
  test("bottom", () => expect(r.bottom).toBe(8))
})

describe("testing is point inside", () => {
  const r = Rect.fromCenter(new Vec2(4, 4), new Vec2(5, 6))
  it("is not inside", () => {
    expect(r.isPointInside(new Vec2(99, 99))).toBe(false)
  })

  it("is on the edge", () => {
    expect(r.isPointInside(new Vec2(6.5, 7))).toBe(true)
  })

  it("is the center", () => {
    expect(r.isPointInside(new Vec2(4, 4))).toBe(true)
  })

  it("is inside", () => {
    expect(r.isPointInside(new Vec2(5, 6))).toBe(true)
  })
})

describe("testing contains", () => {
  const r = Rect.fromCenter(new Vec2(4, 4), new Vec2(5, 6))
  it("does not contains a rect which does not even touch", () => {
    expect(r.contains(Rect.fromCenter(new Vec2(99, 99), new Vec2(2, 3))))
      .toBe(false)
  })

  it("does not contains a rect which overflows", () => {
    expect(r.contains(Rect.fromCenter(new Vec2(4, 4), new Vec2(6, 6))))
      .toBe(false)
  })

  it("does contain a rect which overlaps (as they in they are equals)", () => {
    expect(r.contains(Rect.fromCenter(new Vec2(4, 4), new Vec2(5, 6))))
      .toBe(true)
  })

  it("does contain a rect which is contained", () => {
    expect(r.contains(Rect.fromCenter(new Vec2(4, 4), new Vec2(2, 2))))
      .toBe(true)
  })

  it("does contain a rect which is contained, different center", () => {
    expect(r.contains(Rect.fromCenter(new Vec2(5, 5), new Vec2(2, 2))))
      .toBe(true)
  })
})

describe("test get lines", () => {
  it("gives the right lines, from origin", () => {
    const rec = new Rect(0, 0, 20, 40)
    const [top, right, bottom, left] = rec.lines
    expect(top).toEqual(new Line(0, 0, 20, 0))
    expect(right).toEqual(new Line(20, 0, 20, 40))
    expect(bottom).toEqual(new Line(20, 40, 0, 40))
    expect(left).toEqual(new Line(0, 40, 0, 0))
  })

  it("gives the right lines, not on origin", () => {
    const rec = new Rect(100, 100, 20, 40)
    const [top, right, bottom, left] = rec.lines
    expect(top).toEqual(new Line(100, 100, 120, 100))
    expect(right).toEqual(new Line(120, 100, 120, 140))
    expect(bottom).toEqual(new Line(120, 140, 100, 140))
    expect(left).toEqual(new Line(100, 140, 100, 100))
  })

  it("gives the right lines, x !== y", () => {
    const rec = new Rect(200, 100, 20, 40)
    const [top, right, bottom, left] = rec.lines
    expect(top).toEqual(new Line(200, 100, 220, 100))
    expect(right).toEqual(new Line(220, 100, 220, 140))
    expect(bottom).toEqual(new Line(220, 140, 200, 140))
    expect(left).toEqual(new Line(200, 140, 200, 100))
  })
})

describe("testing collides", () => {
  const r = new Rect(2, 3, 4, 5)
  it("does not collide a far away rect", () => {
    expect(r.collides(new Rect(99, 99, 2, 3))).toBe(false)
  })

  it("collides with a rect which is contained", () => {
    expect(r.collides(new Rect(3, 4, 1, 1))).toBe(true)
  })

  it("collides with a rect which is overlapping", () => {
    expect(r.collides(new Rect(1, 1, 2, 4))).toBe(true)
  })

  it("collides with a rect which is touching", () => {
    expect(r.collides(new Rect(1, 1, 1, 2))).toBe(true)
  })
})

describe("toString", () => {
  it("gives a representation in the x, y, w, h format", () => {
    expect("" + new Rect(1, 2, 3, 4)).toEqual("(1, 2, 3, 4)")
  })
})