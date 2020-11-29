export declare type Vec2ConstructorArg = number | number[] | Vec2;
export default class Vec2 {
    x: number;
    y: number;
    constructor(first: Vec2ConstructorArg, second?: Vec2ConstructorArg);
    add(other: Vec2): Vec2;
    sub(other: Vec2): Vec2;
    mul(by: number): Vec2;
    div(by: number): Vec2;
    sqLen(): number;
    len(): number;
    unit(): Vec2;
    equals(other: Vec2): boolean;
    scal(other: Vec2): number;
    angle(other: Vec2): number;
    toString(): string;
}
