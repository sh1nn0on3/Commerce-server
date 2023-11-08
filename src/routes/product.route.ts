import { Router } from 'express'
import Controllers from '~/controllers'

const router = Router()

router.post('/', Controllers.createProduct)
router.get('/', Controllers.getProduct)
router.get('/total', Controllers.getProducts)
router.put('/', Controllers.updateProduct)
router.delete('/', Controllers.deleteProduct)

export default router
