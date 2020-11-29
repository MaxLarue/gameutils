import { Rect, Vec2 } from "..";
import { InvalidArguments } from "../Exceptions";
import { any, assert } from "../Utils";

export default class Line {
  protected _from: Vec2
  protected _to: Vec2

  constructor(one: Vec2 | number, two: Vec2 | number, three?: number, four?: number) {
    if (one instanceof Vec2 && two instanceof Vec2 && three === undefined && four === undefined) {
      this._from = one
      this._to = two
    } else if (typeof one === typeof(1)
      && typeof two === typeof(1)
      && typeof three === typeof(1)
      && typeof four === typeof(1)) {
        this._from = new Vec2(one, two)
        this._to = new Vec2(three, four)
    } else {
      throw new InvalidArguments("Expected two vectors or four number")
    }
  }

  public get from() {return this._from}
  public get to() {return this._to}

  public get pointDown() {return this.from.y < this.to.y}
  public get pointLeft() {return this.from.x > this.to.x}
  public get pointUp() {return !this.pointDown}
  public get pointRight() {return !this.pointLeft}

  public get pointDownRight() { return this.pointDown && this.pointRight }
  public get pointDownLeft() { return this.pointDown && this.pointLeft }
  public get pointUpRight() { return this.pointUp && this.pointRight }
  public get pointUpLeft() { return this.pointUp && this.pointLeft }

  public get slope() {return this.to.y !== this.from.y ? (this.to.y - this.from.y) / (this.to.x - this.from.x) : 0}

  public getYForX(x: number) {
    if (this.from.x === this.to.x) {
      return this.from.y > this.to.y
        ? this.from.y
        : this.to.y
    }
    const progress = x - this.from.x
    return this.from.y + this.slope * progress
  }

  public isPointOnLine(point: Vec2) {
    return this.rec.isPointInside(point)
      && this.getYForX(point.x) === point.y
  }

  public collideLine(other: Line): boolean {
    const dX: number = this.to.x - this.from.x;
    const dY: number = this.to.y - this.from.y;

    const determinant: number = dX * (other.to.y - other.from.y) - (other.to.x - other.from.x) * dY;
    if (determinant === 0) return false; // parallel lines

    const lambda: number = ((other.to.y - other.from.y) * (other.to.x - this.from.x) + (other.from.x - other.to.x) * (other.to.y - this.from.y)) / determinant;
    const gamma: number = ((this.from.y - this.to.y) * (other.to.x - this.from.x) + dX * (other.to.y - this.from.y)) / determinant;

    if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return false
    else return true
  }

  public collideRect(rec: Rect) {
    return any(rec.lines.map(l => this.collideLine(l)))
      || rec.isPointInside(this.from)
      || rec.isPointInside(this.to)
  }

  public get rec(): Rect {
    if (this.from.x < this.to.x) {
      if (this.from.y < this.to.y) {
        return Rect.fromTopLeftBottomRight(this.from, this.to)
      } else if (this.from.y > this.to.y) {
        return new Rect(
          this.from.x,
          this.to.y,
          Math.abs(this.to.x - this.from.x),
          Math.abs(this.from.y - this.to.y),
        )
      } else {
        return Rect.fromTopLeftBottomRight(this.from, new Vec2(this.to.x, this.to.y + 1))
      }
    }   
    else if(this.from.x > this.to.x) {
      if (this.from.y < this.to.y) {
        return new Rect(
          this.to.x,
          this.from.y,
          Math.abs(this.from.x - this.to.x),
          Math.abs(this.from.y - this.to.y),
        )
      } else if (this.from.y > this.to.y) {
        return new Rect(
          this.to.x,
          this.to.y,
          Math.abs(this.from.x - this.to.x),
          Math.abs(this.from.y - this.to.y),
        )
      } else {
        return Rect.fromTopLeftBottomRight(this.to, new Vec2(this.from.x, this.from.y + 1))
      }
    } else {
      if (this.from.y < this.to.y) {
        return Rect.fromTopLeftBottomRight(this.from, new Vec2(this.to.x + 1, this.to.y))
      } else if (this.from.y > this.to.y) {
        return Rect.fromTopLeftBottomRight(this.to, new Vec2(this.from.x + 1, this.from.y))
      } else {
        return Rect.fromTopLeftBottomRight(this.from, new Vec2(this.to.x + 1, this.to.y + 1))
      }
    }
  }

}