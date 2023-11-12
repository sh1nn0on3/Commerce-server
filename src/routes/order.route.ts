import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken], Controllers.createOrder)
router.put('/', [middlewares.VerifyAccessToken], Controllers.updateBrand)
router.delete('/', [middlewares.VerifyAccessToken], Controllers.deleteOrder)
router.get('/', Controllers.getBrand)

export default router
