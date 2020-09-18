import { gql } from 'apollo-server-express'
import { DateTimeTypeDefinition, DateTypeDefinition, TimeTypeDefinition } from 'graphql-scalars'

export default gql`
  ${DateTimeTypeDefinition}
  ${DateTypeDefinition}
  ${TimeTypeDefinition}
`
