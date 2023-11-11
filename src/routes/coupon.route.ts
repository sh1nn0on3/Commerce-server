import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.createCoupon)
router.get('/', Controllers.getCoupon)
router.put('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.updateCoupon)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteCoupon)

export default router
