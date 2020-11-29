import * as exceptions from "../Exceptions"

export type Vec2ConstructorArg = number | number[] | Vec2

export default class Vec2 {
  public x: number
  public y: number

  constructor(first: Vec2ConstructorArg, second?: Vec2ConstructorArg) {
    if (first instanceof Vec2) {
      this.x = first.x
      this.y = first.y
    } else if (typeof first === 'number' && typeof second === 'number') {
      this.x = first
      this.y = second
    } else if (Array.isArray(first) && !second) {
      this.x = first[0]
      this.y = first[1]
    } else {
      throw new exceptions.InvalidArguments(
        "Expected either two number, an array of two numbers or another Vec2 instance")
    }
  }

  public add(other: Vec2): Vec2 {
    return new Vec2(this.x + other.x, this.y + other.y)
  }

  public sub(other: Vec2): Vec2 {
    return new Vec2(this.x - other.x, this.y - other.y)
  }

  public mul(by: number): Vec2 {
    return new Vec2(this.x * by, this.y * by)
  }

  public div(by: number): Vec2 {
    if (by === 0) {
      throw new exceptions.DivideByZeroException()
    }
    return new Vec2(this.x / by, this.y / by)
  }

  public sqLen(): number {
    return this.x * this.x + this.y * this.y
  }

  public len(): number {
    return Math.sqrt(this.sqLen())
  }

  public unit(): Vec2 {
    return this.div(this.len())
  }

  public equals(other: Vec2): boolean {
    return this.x === other.x && this.y === other.y
  }

  public scal(other: Vec2): number {
    return this.x * other.x + this.y * other.y
  }

  public angle(other: Vec2): number {
    return Math.acos(this.scal(other) / (this.len() * other.len()))
  }

  public toString(): string {
    return `(${this.x}, ${this.y})`
  }

}