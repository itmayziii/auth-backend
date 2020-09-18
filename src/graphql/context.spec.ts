import { describe, it, expect } from '@jest/globals'
import { AppLocals, ResponseLocals } from '../interfaces/express-locals'
import { context } from './context'

describe('context', () => {
  it('should return the expected GraphQL context by combining express app.locals + response.locals', () => {
    expect.assertions(1)
    const appLocals: AppLocals = {
      db: 'some database'
    } as any
    const responseLocals: ResponseLocals = {
      user: 'user for request/response lifecycle'
    } as any
    const actual = context(appLocals, responseLocals)
    expect(actual).toStrictEqual({
      db: 'some database',
      user: 'user for request/response lifecycle'
    })
  })
})
