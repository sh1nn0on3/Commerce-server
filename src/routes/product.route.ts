import { Router } from 'express'
import Controllers from '~/controllers'

const router = Router()

router.post('/', Controllers.createProduct)
router.get('/', Controllers.getProduct)
router.put('/', Controllers.updateProduct)
router.delete('/', Controllers.deleteProduct)

router.get('/total', Controllers.getProducts)

export default router
