import { describe, expect, it } from '@jest/globals'
import { typeDefs } from './type-defs'
import { buildASTSchema } from 'graphql'

describe('typeDefs', () => {
  it('should merge the type definitions found in the "type-defs" directory and give us a valid schema', async () => {
    expect.assertions(1)
    return await typeDefs()
      .then(actual => {
        expect(() => buildASTSchema(actual)).not.toThrow()
      })
  })
})
