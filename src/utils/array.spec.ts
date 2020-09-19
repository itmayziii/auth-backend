import { describe, it, expect } from '@jest/globals'
import { randomItem } from './array'

describe('randomItem', () => {
  it('should return null if the array is empty', () => {
    expect.assertions(1)
    const actual = randomItem([])
    expect(actual).toBeNull()
  })

  it('should return a random item from the array', () => {
    expect.assertions(4)
    const someArray = [
      'test 1',
      'test 2',
      'test 3',
      'test 4',
      'test 5'
    ]
    expect(someArray).toContain(randomItem(someArray))
    expect(someArray).toContain(randomItem(someArray))
    expect(someArray).toContain(randomItem(someArray))
    expect(someArray).toContain(randomItem(someArray))
  })
})
