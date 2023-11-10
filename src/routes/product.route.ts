import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'

const router = Router()

router.post('/', Controllers.createProduct)
router.get('/', Controllers.getProduct)
//  isAdmin
router.put('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.updateProduct)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteProduct)
// get all products
router.get('/totals', Controllers.getAllProducts)
router.get('/total', Controllers.getProducts)

export default router
