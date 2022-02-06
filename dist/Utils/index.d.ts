export declare function assert(expr: boolean, msg?: string): void;
export declare function sum(of: number[]): number;
export declare function all(of: boolean[]): boolean;
export declare function any(of: boolean[]): boolean;
export declare function range(max: number): any[];
export declare function reversed<T>(array: T[]): Generator<T, void, unknown>;
export declare type DefaultMapFactory<K extends string | number | symbol, V> = (key: K) => V;
export declare class DefaultMap<K extends string | number | symbol, V> {
    private readonly factory;
    private innerMap;
    constructor(factory: DefaultMapFactory<K, V>);
    get(key: K): V;
    set(key: K, value: V): void;
    update(key: K, updateFunction: (previousValue: V) => V): void;
    clear(): void;
}
