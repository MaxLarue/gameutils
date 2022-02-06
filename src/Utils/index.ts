import * as exceptions from "../Exceptions"

export function assert(expr: boolean, msg?: string) {
  if (!expr) {
    throw new exceptions.AssertionError(msg || "Assertion failed")
  }
}

export function sum(of: number[]) {
  return of.reduce((prev, curr) => prev + curr, 0)
}

export function all(of: boolean[]): boolean {
  if (of.length === 0) return false
  return of.reduce((prev, curr) => prev && curr, true)
}

export function any(of: boolean[]): boolean {
  if (of.length === 0) return true
  return of.reduce((prev, curr) => prev || curr, false)
}

export function range(max: number) {
  if (max < 0) throw new exceptions.InvalidArguments("Cannot create ranges below 0")
  const ret = []
  for (let i = 0 ; i < max ; ++i) {
    ret.push(i)
  }
  return ret
}

export function* reversed<T>(array: T[]) {
  for (let index = array.length - 1 ; index >= 0 ; --index) {
    yield array[index]
  }
}

export type DefaultMapFactory<K extends string | number | symbol, V> = (key: K) => V
export class DefaultMap<K extends string | number | symbol, V> {
  private innerMap: Record<K, V> = {} as Record<K, V>

  constructor(private readonly factory: DefaultMapFactory<K, V>) {
  }

  get(key: K): V {
    if (!(key in this.innerMap)) {
      this.innerMap[key] = this.factory(key)
    }
    return this.innerMap[key]
  }

  set(key: K, value: V) {
    this.innerMap[key] = value
  }

  update(key: K, updateFunction: (previousValue: V) => V) {
    this.set(key, updateFunction(this.get(key)))
  }

  clear() {this.innerMap = {} as Record<K, V>}
}
