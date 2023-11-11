import { Application, Request, Response } from 'express'
import middlewares from '~/middlewares'
import UserRouter from './user.route'
import AuthRouter from './auth.route'
import ProductRouter from './product.route'
import ProductCategoryRouter from './productCategory.route'
import BlogCategoryRouter from './blogCategory.route'
import BlogRouter from './blog.route'
import BrandRouter from './brand.route'
import CouponRouter from './coupon.route'

const initRoutes = (app: Application) => {
  app.use('/api/v1/auth', AuthRouter)
  app.use('/api/v1/user', middlewares.VerifyAccessToken, UserRouter)
  app.use('/api/v1/product', ProductRouter)
  app.use('/api/v1/product-category', ProductCategoryRouter)
  app.use('/api/v1/blog-category', BlogCategoryRouter)
  app.use('/api/v1/blog', BlogRouter)
  app.use('/api/v1/brand', BrandRouter)
  app.use('/api/v1/coupon', CouponRouter)


  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)
}

export default initRoutes
