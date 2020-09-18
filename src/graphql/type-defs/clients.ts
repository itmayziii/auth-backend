import { gql } from 'apollo-server-express'
import { createdAtComment, updatedAtComment, UUIDComment } from './common'

const clientComments = {
  name: 'Client name which should be a human readable way to quickly identify a client.',
  type: `
  https://tools.ietf.org/html/rfc6749#section-2.1
  
  We do not support hybrid clients that could act as both a public and confidential client.
  Instead you should register 2 separate clients.
  `,
  description: 'Additional information about the client that may help others understand its use.',
  redirectURIs: `
  Absolute URIs as defined by https://tools.ietf.org/html/rfc3986#section-4.3.
  
  These URIs are the accepted list of URIs that the authorization server is allowed to redirect the
  resource owner's user-agent to. This behaviour is described in the oauth2 spec
  https://tools.ietf.org/html/rfc6749#section-3.1.2.
  `
}

export default gql`
  type Query {
    noop: Boolean
  }
  
  type Mutation {
    """Register a client per the oauth2 spec - https://tools.ietf.org/html/rfc6749#section-2."""
    registerClient(input: RegisterClientInput!): RegisterClientPayload!
  }

  type Client {
    """${UUIDComment}"""
    ID: ID!
    """${clientComments.name}"""
    name: String!
    """${createdAtComment('client')}"""
    createdAt: DateTime!
    """${updatedAtComment('client')}"""
    updatedAt: DateTime!
    """${clientComments.type}"""
    type: ClientType!
    """${clientComments.description}"""
    description: String
    """${clientComments.redirectURIs}""" # It would be nice if we could have a URI scalar to ensure proper formatting.
    redirectURIs: [String!]!
    """How many times has the client authenticated with this authorization server."""
    loginCount: Int!
  }

  """https://tools.ietf.org/html/rfc6749#section-2"""
  input RegisterClientInput {
    """${clientComments.name}"""
    name: String!
    """${clientComments.type}"""
    type: ClientType!
    """${clientComments.description}"""
    description: String
    """${clientComments.redirectURIs}"""
    redirectURIs: [String!]!
  }

  """Response for the 'RegisterClient' mutation."""
  type RegisterClientPayload {
    """The client that was registered."""
    client: Client!
  }

  """${clientComments.type}"""
  enum ClientType {
    """
    Clients capable of maintaining the confidentiality of their
    credentials (e.g., client implemented on a secure server with
    restricted access to the client credentials), or capable of secure
    client authentication using other means.
    """
    CONFIDENTIAL
    """
    Clients incapable of maintaining the confidentiality of their
    credentials (e.g., clients executing on the device used by the
    resource owner, such as an installed native application or a web
    browser-based application), and incapable of secure client
    authentication via any other means.
    """
    PUBLIC
  }
`
