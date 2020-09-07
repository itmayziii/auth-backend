import { RequestHandler } from 'express'

export const authorizeHandler: RequestHandler = function authorizeHandler (request, response) {
  response.redirect(302, 'redirectURL')
}
