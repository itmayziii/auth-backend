import { Context } from '../interfaces/context'
import { AppLocals, ResponseLocals } from '../interfaces/express-locals'

export function context (appLocals: AppLocals, responseLocals: ResponseLocals): Context {
  return {
    ...appLocals,
    ...responseLocals
  }
}
