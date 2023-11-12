import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken], Controllers.createOrder)
router.put('/', [middlewares.VerifyAccessToken], Controllers.updateStatus)
router.get('/', [middlewares.VerifyAccessToken], Controllers.getUserOrders)
router.delete('/', [middlewares.VerifyAccessToken], Controllers.deleteOrder)

export default router
