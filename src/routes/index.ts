import { Application, Request, Response } from 'express'
import AuthRouter from './auth.route'
import UserRouter from './user.route'
import middlewares from '~/middlewares'

const initRoutes = (app: Application) => {
  app.use('/api/v1/auth', AuthRouter)
  app.use('/api/v1/user', middlewares.VerifyAccessToken, UserRouter)

  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)
}

export default initRoutes
