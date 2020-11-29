import { Rect, Vec2 } from "..";
export default class Line {
    protected _from: Vec2;
    protected _to: Vec2;
    constructor(one: Vec2 | number, two: Vec2 | number, three?: number, four?: number);
    get from(): Vec2;
    get to(): Vec2;
    get pointDown(): boolean;
    get pointLeft(): boolean;
    get pointUp(): boolean;
    get pointRight(): boolean;
    get pointDownRight(): boolean;
    get pointDownLeft(): boolean;
    get pointUpRight(): boolean;
    get pointUpLeft(): boolean;
    get slope(): number;
    getYForX(x: number): number;
    isPointOnLine(point: Vec2): boolean;
    collideLine(other: Line): boolean;
    collideRect(rec: Rect): boolean;
    get rec(): Rect;
}
