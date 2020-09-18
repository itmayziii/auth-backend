import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: String
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export interface Query {
  __typename?: 'Query'
  noop?: Maybe<Scalars['Boolean']>
}

export interface Mutation {
  __typename?: 'Mutation'
  /** Register a client per the oauth2 spec - https://tools.ietf.org/html/rfc6749#section-2. */
  registerClient: RegisterClientPayload
}

export interface MutationRegisterClientArgs {
  input: RegisterClientInput
}

export interface Client {
  __typename?: 'Client'
  /**
   * The data type uuid stores Universally Unique Identifiers (UUID) as defined by RFC 4122, ISO/IEC 9834-8:2005,
   * and related standards. (Some systems refer to this data type as a globally unique identifier, or GUID, instead.)
   * This identifier is a 128-bit quantity that is generated by an algorithm chosen to make it very unlikely that the
   * same identifier will be generated by anyone else in the known universe using the same algorithm.
   * Therefore, for distributed systems, these identifiers provide a better uniqueness guarantee than sequence generators,
   * which are only unique within a single database.
   */
  ID: Scalars['ID']
  /** Client name which should be a human readable way to quickly identify a client. */
  name: Scalars['String']
  /** When the client was created at, this value should never change. */
  createdAt: Scalars['DateTime']
  /** When the client was last updated. This value will change every time an update occurs on the client record. */
  updatedAt: Scalars['DateTime']
  /**
   * https://tools.ietf.org/html/rfc6749#section-2.1
   *
   * We do not support hybrid clients that could act as both a public and confidential client.
   * Instead you should register 2 separate clients.
   */
  type: ClientType
  /** Additional information about the client that may help others understand its use. */
  description?: Maybe<Scalars['String']>
  /**
   * Absolute URIs as defined by https://tools.ietf.org/html/rfc3986#section-4.3.
   *
   * These URIs are the accepted list of URIs that the authorization server is allowed to redirect the
   * resource owner's user-agent to. This behaviour is described in the oauth2 spec
   * https://tools.ietf.org/html/rfc6749#section-3.1.2.
   */
  redirectURIs: Array<Scalars['String']>
  /** How many times has the client authenticated with this authorization server. */
  loginCount: Scalars['Int']
}

/** https://tools.ietf.org/html/rfc6749#section-2 */
export interface RegisterClientInput {
  /** Client name which should be a human readable way to quickly identify a client. */
  name: Scalars['String']
  /**
   * https://tools.ietf.org/html/rfc6749#section-2.1
   *
   * We do not support hybrid clients that could act as both a public and confidential client.
   * Instead you should register 2 separate clients.
   */
  type: ClientType
  /** Additional information about the client that may help others understand its use. */
  description?: Maybe<Scalars['String']>
  /**
   * Absolute URIs as defined by https://tools.ietf.org/html/rfc3986#section-4.3.
   *
   * These URIs are the accepted list of URIs that the authorization server is allowed to redirect the
   * resource owner's user-agent to. This behaviour is described in the oauth2 spec
   * https://tools.ietf.org/html/rfc6749#section-3.1.2.
   */
  redirectURIs: Array<Scalars['String']>
}

/** Response for the 'RegisterClient' mutation. */
export interface RegisterClientPayload {
  __typename?: 'RegisterClientPayload'
  /** The client that was registered. */
  client: Client
}

/**
 * https://tools.ietf.org/html/rfc6749#section-2.1
 *
 * We do not support hybrid clients that could act as both a public and confidential client.
 * Instead you should register 2 separate clients.
 */
export enum ClientType {
  /**
   * Clients capable of maintaining the confidentiality of their
   * credentials (e.g., client implemented on a secure server with
   * restricted access to the client credentials), or capable of secure
   * client authentication using other means.
   */
  Confidential = 'CONFIDENTIAL',
  /**
   * Clients incapable of maintaining the confidentiality of their
   * credentials (e.g., clients executing on the device used by the
   * resource owner, such as an installed native application or a web
   * browser-based application), and incapable of secure client
   * authentication via any other means.
   */
  Public = 'PUBLIC'
}

/** Tenant represents a set of users. i.e. A tenant is commonly a company name like Sherwin-Williams */
export interface Tenant {
  __typename?: 'Tenant'
  /**
   * The data type uuid stores Universally Unique Identifiers (UUID) as defined by RFC 4122, ISO/IEC 9834-8:2005,
   * and related standards. (Some systems refer to this data type as a globally unique identifier, or GUID, instead.)
   * This identifier is a 128-bit quantity that is generated by an algorithm chosen to make it very unlikely that the
   * same identifier will be generated by anyone else in the known universe using the same algorithm.
   * Therefore, for distributed systems, these identifiers provide a better uniqueness guarantee than sequence generators,
   * which are only unique within a single database.
   */
  ID: Scalars['ID']
  /** When the tenant was created at, this value should never change. */
  createdAt: Scalars['DateTime']
  /** When the tenant was last updated. This value will change every time an update occurs on the tenant record. */
  updatedAt: Scalars['DateTime']
  /** Name of the tenant which should be unique among other tenants. */
  name: Scalars['String']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export interface LegacyStitchingResolver<TResult, TParent, TContext, TArgs> {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export interface NewStitchingResolver<TResult, TParent, TContext, TArgs> {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Mutation: ResolverTypeWrapper<{}>
  Client: ResolverTypeWrapper<Client>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  RegisterClientInput: RegisterClientInput
  RegisterClientPayload: ResolverTypeWrapper<RegisterClientPayload>
  ClientType: ClientType
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  Date: ResolverTypeWrapper<Scalars['Date']>
  Time: ResolverTypeWrapper<Scalars['Time']>
  Tenant: ResolverTypeWrapper<Tenant>
  CacheControlScope: CacheControlScope
  Upload: ResolverTypeWrapper<Scalars['Upload']>
}>

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {}
  Boolean: Scalars['Boolean']
  Mutation: {}
  Client: Client
  ID: Scalars['ID']
  String: Scalars['String']
  Int: Scalars['Int']
  RegisterClientInput: RegisterClientInput
  RegisterClientPayload: RegisterClientPayload
  DateTime: Scalars['DateTime']
  Date: Scalars['Date']
  Time: Scalars['Time']
  Tenant: Tenant
  Upload: Scalars['Upload']
}>

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  noop?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
}>

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  registerClient?: Resolver<ResolversTypes['RegisterClientPayload'], ParentType, ContextType, RequireFields<MutationRegisterClientArgs, 'input'>>
}>

export type ClientResolvers<ContextType = any, ParentType extends ResolversParentTypes['Client'] = ResolversParentTypes['Client']> = ResolversObject<{
  ID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['ClientType'], ParentType, ContextType>
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  redirectURIs?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  loginCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export type RegisterClientPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterClientPayload'] = ResolversParentTypes['RegisterClientPayload']> = ResolversObject<{
  client?: Resolver<ResolversTypes['Client'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time'
}

export type TenantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tenant'] = ResolversParentTypes['Tenant']> = ResolversObject<{
  ID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}>

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Client?: ClientResolvers<ContextType>
  RegisterClientPayload?: RegisterClientPayloadResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Date?: GraphQLScalarType
  Time?: GraphQLScalarType
  Tenant?: TenantResolvers<ContextType>
  Upload?: GraphQLScalarType
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
