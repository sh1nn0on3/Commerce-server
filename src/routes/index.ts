import { Application, Request, Response } from 'express'
import middlewares from '~/middlewares'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import ProductRouter from './product.route'
import ProductCategoryRouter from './productCategory.route'
import BlogCategoryRouter from './blogCategory.route'

const initRoutes = (app: Application) => {
  app.use('/api/v1/auth', AuthRouter)
  app.use('/api/v1/user', middlewares.VerifyAccessToken, UserRouter)
  app.use('/api/v1/product', ProductRouter)
  app.use('/api/v1/product-category', ProductCategoryRouter)
  app.use('/api/v1/blog-category', BlogCategoryRouter)

  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)
}

export default initRoutes
