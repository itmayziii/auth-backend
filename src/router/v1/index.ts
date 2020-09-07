import { Router } from 'express'
import { oauth2Router } from './oauth2'

const v1Router = Router()

v1Router.use('/oauth2', oauth2Router)

export {
  v1Router
}
