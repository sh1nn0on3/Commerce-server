import { Application, Request, Response } from 'express'
import AuthRouter from './users.routes'

const initRoutes = (app: Application) => {
  app.use('/api/v1/auth', AuthRouter)

  return app.use('*', (req: Request, res: Response) => {
    return res.status(200).json({
      success: false,
      msg: 'Server on ...'
    })
  })
}

export default initRoutes
