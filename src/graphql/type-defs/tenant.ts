import { gql } from 'apollo-server-express'
import { createdAtComment, updatedAtComment, UUIDComment } from './common'

const tenantComments = {
  name: 'Name of the tenant which should be unique among other tenants.'
}

export default gql`
  """
  Tenant represents a set of users. i.e. A tenant is commonly a company name like Sherwin-Williams
  """
  type Tenant {
    """${UUIDComment}"""
    ID: ID!
    """${createdAtComment('tenant')}"""
    createdAt: DateTime!
    """${updatedAtComment('tenant')}"""
    updatedAt: DateTime!
    """${tenantComments.name}"""
    name: String!
  }
`
