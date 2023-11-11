import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.createProductCategory)
router.get('/', Controllers.getProductCategory)
router.put('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.updateProductCategory)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteProductCategory)

export default router
