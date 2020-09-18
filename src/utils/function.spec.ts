import { callTimes } from './function'
import { describe, it, expect } from '@jest/globals'

describe('callTimes', () => {
  it('should return an empty array if we pass in 0 as the number of times to execute the function', async () => {
    expect.assertions(1)
    const fn = (): string => 'hello'
    return callTimes(fn, 0)
      .then(actual => {
        expect(actual).toStrictEqual([])
      })
  })

  it('should return an array with the return values of the function passed in', async () => {
    expect.assertions(18)
    const simpleFn = (): string => 'hello'
    const complexFn = (): number => Math.random() * 100
    const promiseFn = async (): Promise<string> => 'hello'

    const simpleFnPromise = callTimes(simpleFn, 3)
    const complexFnPromise = callTimes(complexFn, 5)
    const promiseFnPromise = callTimes(promiseFn, 4)

    return await Promise.all([simpleFnPromise, complexFnPromise, promiseFnPromise])
      .then(([simpleFnActual, complexFnActual, promiseFnActual]) => {
        expect(simpleFnActual).toStrictEqual(['hello', 'hello', 'hello'])

        expect(complexFnActual).toHaveLength(5)

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

        expect(promiseFnActual).toStrictEqual(['hello', 'hello', 'hello', 'hello'])
      })
  })
})
