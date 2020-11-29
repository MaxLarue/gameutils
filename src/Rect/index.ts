import * as exceptions from "../Exceptions"
import Vec2 from "../Vec2"
import * as utils from "../Utils"
import Line from "../Line"


export default class Rect {
  public _x: number
  public _y: number
  public _w: number
  public _h: number

  constructor(x: number, y: number, w: number, h: number) {
    if (w <= 0 || h <= 0) {
      throw new exceptions.InvalidArguments("Negative or null-sized Rect")
    }
    this._x = x
    this._y = y
    this._w = w
    this._h = h
  }

  public static fromTopLeft(topLeft: Vec2, size: Vec2): Rect {
    return new Rect(topLeft.x, topLeft.y, size.x, size.y)
  }

  public static fromCenter(center: Vec2, size: Vec2): Rect {
    return new Rect(center.x - size.x / 2, center.y - size.y / 2, size.x, size.y)
  }

  public static fromTopLeftBottomRight(topLeft: Vec2, bottomRight: Vec2): Rect {
    return new Rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)
  }

  public get x() {return this._x}
  public get y() {return this._y}
  public get position() {return new Vec2(this.x, this.y)}
  public get w() {return this._w}
  public get h() {return this._h}
  public get size() {return new Vec2(this.w, this.h)}
  
  public get left() {return this.x}
  public get right() {return this.x + this.w}
  public get top() {return this.y}
  public get bottom() {return this.y + this.h}

  public get topLeft() {return new Vec2(this.left, this.top)}
  public get topRight() {return new Vec2(this.right, this.top)}
  public get bottomLeft() {return new Vec2(this.left, this.bottom)}
  public get bottomRight() {return new Vec2(this.right, this.bottom)}
  public get center() {return new Vec2(this.x + this.w / 2, this.y + this.h / 2)}

  public get lines(): [Line, Line, Line, Line] {
    return [
      //top
      new Line(this.left, this.top, this.right, this.top),
      //right
      new Line(this.right, this.top, this.right, this.bottom),
      //bottom
      new Line(this.right, this.bottom, this.left, this.bottom),
      //left
      new Line(this.left, this.bottom, this.left, this.top)
    ]
  }

  public flip(): Rect {
    return Rect.fromCenter(this.center, new Vec2(this.h, this.w))
  }

  public equals(other: Rect) {
    return this.center.equals(other.center) && this.topLeft.equals(other.topLeft)
  }

  public isPointInside(point: Vec2): boolean {
    return utils.all([
      point.x >= this.left,
      point.x <= this.right,
      point.y >= this.top,
      point.y <= this.bottom,
    ])
  }

  public contains(other: Rect): boolean {
    return utils.all([
     this.left <= other.left,
     this.right >= other.right,
     this.top <= other.top,
     this.bottom >= other.bottom,
    ])
  }

  public collides(other: Rect): boolean {
    return !utils.any([
      this.left > other.right,
      this.right < other.left,
      this.top > other.bottom,
      this.bottom < other.top,
    ])
  }

  public getMinimalAdjustment(other: Rect): Vec2 {
    return other.center.sub(this.center)
  }

  public toString(): string {
    return `(${this.x}, ${this.y}, ${this.w}, ${this.h})`
  }
}