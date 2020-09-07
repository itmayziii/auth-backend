import { Handler } from 'express'
import { ResponseLocals } from '../interfaces/express-locals'

export const authenticateMiddleware: Handler = function authenticateMiddleware (request, response, next) {
  (response.locals as ResponseLocals) = {
    ...response.locals
  }

  next()
}
