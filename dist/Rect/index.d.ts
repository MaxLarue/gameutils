import Vec2 from "../Vec2";
import Line from "../Line";
export default class Rect {
    _x: number;
    _y: number;
    _w: number;
    _h: number;
    constructor(x: number, y: number, w: number, h: number);
    static fromTopLeft(topLeft: Vec2, size: Vec2): Rect;
    static fromCenter(center: Vec2, size: Vec2): Rect;
    static fromTopLeftBottomRight(topLeft: Vec2, bottomRight: Vec2): Rect;
    get x(): number;
    get y(): number;
    get position(): Vec2;
    get w(): number;
    get h(): number;
    get size(): Vec2;
    get left(): number;
    get right(): number;
    get top(): number;
    get bottom(): number;
    get topLeft(): Vec2;
    get topRight(): Vec2;
    get bottomLeft(): Vec2;
    get bottomRight(): Vec2;
    get center(): Vec2;
    get lines(): [Line, Line, Line, Line];
    flip(): Rect;
    equals(other: Rect): boolean;
    isPointInside(point: Vec2): boolean;
    contains(other: Rect): boolean;
    collides(other: Rect): boolean;
    getMinimalAdjustment(other: Rect): Vec2;
    toString(): string;
}