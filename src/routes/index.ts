import { Application, Request, Response } from 'express'
import AuthRouter from './users.routes'
import middlewares from '~/middlewares'

const initRoutes = (app: Application) => {
  app.use('/api/v1/auth', AuthRouter)

  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)
}

export default initRoutes
