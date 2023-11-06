import { notFound, errorHandler } from './error.middleware'
import { VerifyAccessToken } from './verifyToken.middleware'

const middlewares = {
  notFound,
  errorHandler,
  VerifyAccessToken
}

export default middlewares
