import path from 'path'
import { loadFiles } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { DocumentNode } from 'graphql'

export async function typeDefs (): Promise<DocumentNode> {
  return await loadFiles(path.resolve(__dirname, 'type-defs'))
    .then(files => mergeTypeDefs(files))
}
