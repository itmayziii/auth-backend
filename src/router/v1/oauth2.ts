import { Router } from 'express'
import { authorizeHandler } from '../../handlers/oauth2'

const oauth2Router = Router()

oauth2Router.get('/authorize', authorizeHandler)

export {
  oauth2Router
}
