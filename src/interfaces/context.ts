import { AppLocals, ResponseLocals } from './express-locals'

// Mostly to make sure that our GraphQL context and express application context are the same.
export type Context = AppLocals & ResponseLocals
