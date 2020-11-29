export default class Cooldown {
    protected _time: number;
    protected _elapsed: number;
    protected _lastActivation: number;
    constructor(time: number);
    get time(): number;
    get elapsed(): number;
    get ready(): boolean;
    addDelta(delta: number): void;
    activate(): void;
}
