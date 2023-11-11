import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken], Controllers.createBrand)
router.get('/', Controllers.getBrand)
router.put('/', [middlewares.VerifyAccessToken], Controllers.updateBrand)
router.delete('/', [middlewares.VerifyAccessToken], Controllers.deleteBrand)

export default router
