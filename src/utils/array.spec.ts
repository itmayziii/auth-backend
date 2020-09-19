import { describe, it, expect } from '@jest/globals'
import { randomItem, randomItems } from './array'

describe('randomItem', () => {
  it('should return null if the passed in array is empty', () => {
    expect.assertions(1)
    const actual = randomItem([])
    expect(actual).toBeNull()
  })

  it('should return a random item from the passed in array', () => {
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

describe('randomItems', () => {
  it('should return an empty array if the passed in array is empty', () => {
    expect.assertions(1)
    const actual = randomItems([], 3)
    expect(actual).toStrictEqual([])
  })

  it('should return an empty array if the passed in "max" is for some reason set to 0', () => {
    expect.assertions(1)
    const actual = randomItems(['hello', 'testing'], 0)
    expect(actual).toStrictEqual([])
  })

  it('should return random items from the passed in array', () => {
    expect.assertions(5)
    const items = [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
      'twenty'
    ]

    const actual1 = randomItems(items, 4)
    expect(actual1.length).toBeLessThanOrEqual(4)
    expect(actual1.length).toBeGreaterThan(0)

    const actual2 = randomItems(items, 7)
    expect(actual1.length).toBeLessThanOrEqual(7)
    expect(actual1.length).toBeGreaterThan(0)

    // I do not love this assertion because it is possible for the test to fail if we somehow get the same random items.
    // We have 20 items in the array so I'm going to leave this here for now because that should not happen.
    expect(actual1).not.toStrictEqual(actual2)
  })

  it('should not have duplicate items if the "condition" evaluates to true', () => {
    expect.assertions(2)
    const items = [
      {
        id: 1,
        name: 'One'
      },
      {
        id: 2,
        name: 'Two'
      }
    ]

    const actual = randomItems(items, 100, (x, y) => x.id === y.id)
    expect(actual.length).toBeLessThanOrEqual(2)
    expect(actual.length).toBeGreaterThan(0)
  })
})
