import {DefaultMap} from "../index";

describe('Testing the default map', function () {
  it('calls the factory when it has no value', () => {
    const map = new DefaultMap<string, number>(() => 0)

    expect(map.get('l')).toEqual(0)
  })

  it('can be used for histogram', () => {
    const map = new DefaultMap<string, number>(() => 0)

    for (const letter of 'hello world') {
      map.update(letter, count => count + 1)
    }

    expect(map.get('l')).toEqual(3)
  })

  it('can set value', () => {
    const map = new DefaultMap<string, number>(() => 0)

    map.set('l', 15)

    expect(map.get('l')).toEqual(15)
  })

  it('passes the key to the factory', () => {
    const map = new DefaultMap<string, number>((key) => {
      if (key === 'l') {
        return 10
      }
      return 1
    })

    expect(map.get('l')).toEqual(10)
    expect(map.get('o')).toEqual(1)
  })

  it('can be cleared', () => {
    const map = new DefaultMap<string, number>(() => 0)

    map.set('l', 15)
    map.clear()

    expect(map.get('l')).toEqual(0)
  })
});
