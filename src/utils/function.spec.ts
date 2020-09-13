import { callTimes } from './function'

describe('callTimes', () => {
  it('should return an empty array if we pass in 0 as the number of times to execute the function', () => {
    const fn = (): string => 'hello'
    const actual = callTimes(fn, 0)
    expect(actual).toEqual([])
  })

  it('should return an array with the return values of the function passed in', () => {
    const simpleFn = (): string => 'hello'
    const simpleFnActual = callTimes(simpleFn, 3)
    expect(simpleFnActual).toEqual(['hello', 'hello', 'hello'])

    const complexFn = (): number => Math.random() * 100
    const complexFnActual = callTimes(complexFn, 5)
    expect(complexFnActual.length).toBe(5)

    expect(typeof complexFnActual[0]).toBe('number')
    expect(complexFnActual[0]).toBeLessThanOrEqual(100)
    expect(complexFnActual[0]).toBeGreaterThanOrEqual(0)

    expect(typeof complexFnActual[1]).toBe('number')
    expect(complexFnActual[1]).toBeLessThanOrEqual(100)
    expect(complexFnActual[1]).toBeGreaterThanOrEqual(0)

    expect(typeof complexFnActual[2]).toBe('number')
    expect(complexFnActual[2]).toBeLessThanOrEqual(100)
    expect(complexFnActual[2]).toBeGreaterThanOrEqual(0)

    expect(typeof complexFnActual[3]).toBe('number')
    expect(complexFnActual[3]).toBeLessThanOrEqual(100)
    expect(complexFnActual[3]).toBeGreaterThanOrEqual(0)

    expect(typeof complexFnActual[4]).toBe('number')
    expect(complexFnActual[4]).toBeLessThanOrEqual(100)
    expect(complexFnActual[4]).toBeGreaterThanOrEqual(0)
  })
})
