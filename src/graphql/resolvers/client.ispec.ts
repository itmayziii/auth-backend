import { describe, expect, it } from '@jest/globals'
import { gql } from 'apollo-server-express'
import { request } from 'graphql-request'
import * as http from 'http'
import { ClientType, RegisterClientInput, RegisterClientPayload } from '../../interfaces/graphql-schema'
import faker from 'faker/locale/en_US'
import index from '../../index'

describe('mutations', () => {
  const registerClientMutation = gql`
    mutation registerClient($input: RegisterClientInput!) {
      registerClient(input: $input) {
        client {
          ID
          createdAt
          updatedAt
          name
          type
          description
          redirectURIs
          loginCount
        }
      }
    }
  `

  let server: http.Server
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    return await index
      .then(appServer => {
        server = appServer
      })
  })

  // eslint-disable-next-line jest/no-hooks, jest/no-done-callback
  afterAll((done) => {
    server.close(done)
  })

  describe('registerClient', () => {
    it('true', async () => {
      expect.assertions(1)

      const expectedName = `${faker.random.word()} ${Math.floor(Math.random() * 5000)}`
      const expectedDescription = faker.random.words()
      const port = process.env.SERVER_PORT ?? '80'
      return await request<{ registerClient: RegisterClientPayload }, { input: RegisterClientInput }>(
        `http://localhost:${port}/graphql`,
        registerClientMutation,
        {
          input: {
            name: expectedName,
            type: ClientType.Public,
            description: expectedDescription,
            redirectURIs: []
          }
        })
        .then(({ registerClient }) => {
          expect(registerClient).toStrictEqual(expect.objectContaining({
            client: {
              ID: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              name: expectedName,
              type: ClientType.Public,
              description: expectedDescription,
              redirectURIs: expect.any(Array),
              loginCount: expect.any(Number)
            }
          }))
        })
    })
  })
})
