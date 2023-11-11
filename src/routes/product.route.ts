import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'

const router = Router()

router.post('/', Controllers.createProduct)
router.patch('/', Controllers.getProduct)
//  isAdmin
router.put('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.updateProduct)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteProduct)
// get all products
router.get('/', Controllers.getProducts)

// Ratings
router.post('/ratings', [middlewares.VerifyAccessToken], Controllers.ratings)

export default router
