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