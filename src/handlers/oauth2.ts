import { RequestHandler } from 'express'
import { AppLocals } from '../interfaces/express-locals'

export const authorizeHandler: RequestHandler = function authorizeHandler (request, response) {
  const { db } = response.app.locals as AppLocals
  db.select().from('tenant')
    .then(val => {
      response.json(val)
    })
    .catch(console.error)
}
