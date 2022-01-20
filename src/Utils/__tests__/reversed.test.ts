import {reversed} from "../index";

function testReversed<T>(input: T[], output: T[]) {
  const yielded = []
  for (const element of reversed(input)) {
    yielded.push(element)
  }
  expect(output).toEqual(yielded)
}

describe('testing reversed', () => {
  const testCases: any[][] = [
    [[], []],
    [[0], [0]],
    [[0, 1, 2, 3], [3, 2, 1, 0]],
    [['a', 'b', 'c'], ['c', 'b', 'a']],
    ['abc', ['c', 'b', 'a']],
  ]

  testCases.forEach(([input, output]) => it(`Given ${input} should yield ${output}`, () => testReversed(input, output)))
})
