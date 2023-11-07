import { notFound, errorHandler } from './error.middleware'
import { VerifyAccessToken, isAdmin } from './verifyToken.middleware'

const middlewares = {
  notFound,
  errorHandler,
  VerifyAccessToken,
  isAdmin
}

export default middlewares
