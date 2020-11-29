import Line from ".."
import { Vec2 } from "../.."
import { InvalidArguments } from "../../Exceptions"
import Rect from "../../Rect"


describe("testing the line class", () => {
  it("Can be built using Vec2", () => {
    const start = new Vec2(10, 10)
    const end = new Vec2(30, 30)
    const line = new Line(start, end)
    expect(line.from).toEqual(start)
    expect(line.to).toEqual(end)
  })

  it("can be built using numbers only", () => {
    const start = new Vec2(10, 10)
    const end = new Vec2(30, 30)
    const line = new Line(start.x, start.y, end.x, end.y)
    expect(line.from).toEqual(start)
    expect(line.to).toEqual(end)
  })
  
  it("throws if invalid combination", () => {
    expect(() => new Line(new Vec2(0, 0), new Vec2(10, 10), 5, 6))
      .toThrow(InvalidArguments)
  })
})

describe("testing line to line collision", () => {
  it("does not collide (parallel)", () => {
    expect(new Line(0, 0, 10, 0).collideLine(new Line(0, 10, 10, 10)))
      .toBe(false)
  })
  it("collides (perpendicular)", () => {
    expect(new Line(0, 5, 10, 5).collideLine(new Line(5, 0, 5, 10)))
    .toBe(true)
  })
  it("collides (random)", () => {
    expect(new Line(0, 0, 100, 100).collideLine(new Line(0, 100, 100, 70)))
    .toBe(true)
  })
  it("does not collide (segment too short)", () => {
    expect(new Line(0, 0, 100, 100).collideLine(new Line(0, 100, 20, 70)))
      .toBe(false)
  })
})

describe("testing line to rect collision", () => {
  it ("does not collide, line is parralel to an edge", () => {
    expect(new Line(0, 0, 100, 0).collideRect(new Rect(0, 200, 100, 200)))
      .toBe(false)
  })
  it ("does not collide, line is too short", () => {
    expect(new Line(200, 0, 300, 0).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(false)
  })
  it ("does not collide, regular test", () => {
    expect(new Line(0, 400, 400, 0).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(false)
  })
  it("collides when line is onto a side (top)", () => {
    expect(new Line(0, 0, 50, 0).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line is onto a side (right)", () => {
    expect(new Line(100, 0, 100, 20).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line is onto a side (bottom)", () => {
    expect(new Line(0, 200, 20, 200).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line is onto a side (left)", () => {
    expect(new Line(0, 0, 0, 50).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line crosses a side (top)", () => {
    expect(new Line(10, -20, 10, 20).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line crosses a side (right)", () => {
    expect(new Line(50, 100, 200, 50).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line crosses a side (bottom)", () => {
    expect(new Line(50, 100, 50, 300).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line crosses a side (left)", () => {
    expect(new Line(-50, 100, 50, 100).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
  it("collides when line is inside the rect", () => {
    expect(new Line(25, 25, 75, 75).collideRect(new Rect(0, 0, 100, 200)))
      .toBe(true)
  })
})

describe("testing get rect, downward right line", () => {
  it("returns the rect for default case", () => {
    const line = new Line(0, 0, 30, 40)
    expect(line.rec).toEqual(new Rect(0, 0, 30, 40))
  })
  it("returns a 1 px height rect for horizontal line", () => {
    const line = new Line(10, 20, 50, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 40, 1))
  })
  it("returns a 1 px wide rect for vertical line", () => {
    const line = new Line(10, 20, 10, 50)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 30))
  })
  it("returns a 1x1 rect for line where from === to", () => {
    const line = new Line(10, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 1))
  })
})

describe("testing get rect, downward left line", () => {
  it("returns the rect for default case", () => {
    const line = new Line(30, 0, 0, 40)
    expect(line.rec).toEqual(new Rect(0, 0, 30, 40))
  })
  it("returns a 1 px height rect for horizontal line", () => {
    const line = new Line(50, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 40, 1))
  })
  it("returns a 1 px wide rect for vertical line", () => {
    const line = new Line(10, 50, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 30))
  })
  it("returns a 1x1 rect for line where from === to", () => {
    const line = new Line(10, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 1))
  })
})

describe("testing get rect, upward right line", () => {
  it("returns the rect for default case", () => {
    const line = new Line(0, 40, 30, 0)
    expect(line.rec).toEqual(new Rect(0, 0, 30, 40))
  })
  it("returns a 1 px height rect for horizontal line", () => {
    const line = new Line(50, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 40, 1))
  })
  it("returns a 1 px wide rect for vertical line", () => {
    const line = new Line(10, 50, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 30))
  })
  it("returns a 1x1 rect for line where from === to", () => {
    const line = new Line(10, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 1))
  })
})

describe("testing get rect, upward left line", () => {
  it("returns the rect for default case", () => {
    const line = new Line(30, 40, 0, 0)
    expect(line.rec).toEqual(new Rect(0, 0, 30, 40))
  })
  it("returns a 1 px height rect for horizontal line", () => {
    const line = new Line(50, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 40, 1))
  })
  it("returns a 1 px wide rect for vertical line", () => {
    const line = new Line(10, 50, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 30))
  })
  it("returns a 1x1 rect for line where from === to", () => {
    const line = new Line(10, 20, 10, 20)
    expect(line.rec).toEqual(new Rect(10, 20, 1, 1))
  })
})

describe("test get Y for x", () => {
  it("will return y, horizontal line", () => {
    expect(new Line(0, 0, 30, 0).getYForX(15)).toEqual(0)
  })
  it("will return highest y, vertical line", () => {
    expect(new Line(0, 0, 0, 30).getYForX(0)).toEqual(30)
  })
  it("will return middle y, perfect diagonal line, downward right", () => {
    expect(new Line(0, 0, 30, 30).getYForX(15)).toEqual(15)
  })
  it("will return middle y, perfect diagonal line, downward left", () => {
    expect(new Line(30, 0, 0, 30).getYForX(15)).toEqual(15)
  })
  it("will return middle y, perfect diagonal line, upward left", () => {
    expect(new Line(30, 30, 0, 0).getYForX(15)).toEqual(15)
  })
  it("will return middle y, perfect diagonal line, upward right", () => {
    expect(new Line(0, 30, 30, 0).getYForX(15)).toEqual(15)
  })
  it("works for real life example", () => {
    const line = new Line(new Vec2(1180.4455846113485, 523), new Vec2(1072.4455846113485, 559.5))
    const points = [
      new Vec2(1132.4455846113485, 539.222),
      new Vec2(1114.4455846113485, 545.304),
      new Vec2(1096.4455846113485, 551.388),
    ]
    points.map(p => expect(line.getYForX(p.x)).toBeCloseTo(p.y))
  })
})

describe("testing direction accessors", () => {
  describe("down ", () => {
    it("should point down ", () => {
      expect(new Line(30, 0, 0, 40).pointDown).toBe(true)
    })
    it("should NOT point down ", () => {
      expect(new Line(0, 50, 30, 40).pointDown).toBe(false)
    })
  })

  describe("down ", () => {
    it("should point down ", () => {
      expect(new Line(0, 0, 30, 40).pointDown).toBe(true)
    })
    it("should NOT point down ", () => {
      expect(new Line(0, 0, 30, -40).pointDown).toBe(false)
    })
  })

  describe("Up ", () => {
    it("should point Up ", () => {
      expect(new Line(30, 40, 0, 0).pointUp).toBe(true)
    })
    it("should NOT point Up ", () => {
      expect(new Line(0, 0, 30, 40).pointUp).toBe(false)
    })
  })

  describe("Up ", () => {
    it("should point Up ", () => {
      expect(new Line(0, 40, 30, 0).pointUp).toBe(true)
    })
    it("should NOT point Up ", () => {
      expect(new Line(0, 0, 30, 40).pointUp).toBe(false)
    })
  })

  describe("down left", () => {
    it("should point down left", () => {
      expect(new Line(30, 0, 0, 40).pointDownLeft).toBe(true)
    })
    it("should NOT point down left", () => {
      expect(new Line(0, 0, 30, 40).pointDownLeft).toBe(false)
    })
  })

  describe("down right", () => {
    it("should point down right", () => {
      expect(new Line(0, 0, 30, 40).pointDownRight).toBe(true)
    })
    it("should NOT point down right", () => {
      expect(new Line(0, 0, 30, -40).pointDownRight).toBe(false)
    })
  })

  describe("Up left", () => {
    it("should point Up left", () => {
      expect(new Line(30, 40, 0, 0).pointUpLeft).toBe(true)
    })
    it("should NOT point Up left", () => {
      expect(new Line(0, 0, 30, 40).pointUpLeft).toBe(false)
    })
  })

  describe("Up right", () => {
    it("should point Up right", () => {
      expect(new Line(0, 40, 30, 0).pointUpRight).toBe(true)
    })
    it("should NOT point Up right", () => {
      expect(new Line(0, 0, 30, 40).pointUpRight).toBe(false)
    })
  })
})

describe("testing slope accessor", () => {
  it("is 0 for horizontal", () => {
    expect(new Line(0, 0, 30, 0).slope).toBe(0)
  })
  it("is Infinity for vertical", () => {
    expect(new Line(0, 0, 0, 30).slope).toBe(Infinity)
  })
  it("is -1 for a perfect diagonal going up right", () => {
    expect(new Line(0, 30, 30, 0).slope).toBe(-1)
  })
  it("is -1 for a perfect diagonal going down left", () => {
    expect(new Line(30, 0, 0, 30).slope).toBe(-1)
  })
  it("is 1 for a perfect diagonal going up left", () => {
    expect(new Line(30, 30, 0, 0).slope).toBe(1)
  })
  it("is 1 for a perfect diagonal going down right", () => {
    expect(new Line(0, 0, 30, 30).slope).toBe(1)
  })
})


describe("test is point on line", () => {
  it("is not on", () => {
    expect(new Line(0, 0, 40, 30).isPointOnLine(new Vec2(60, 70))).toBe(false)
  })
  it("is not on (good slope but not on segment)", () => {
    expect(new Line(0, 0, 40, 40).isPointOnLine(new Vec2(50, 50))).toBe(false)
  })
  it("is not on (bad slope but in segment area)", () => {
    expect(new Line(0, 0, 40, 40).isPointOnLine(new Vec2(20, 21))).toBe(false)
  })
  it("is on", () => {
    expect(new Line(0, 0, 40, 40).isPointOnLine(new Vec2(20, 20))).toBe(true)
  })
})