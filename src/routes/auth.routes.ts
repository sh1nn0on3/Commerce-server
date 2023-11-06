import { Router } from 'express'
import Controllers from '~/controllers'

const router = Router()

router.post('/register', Controllers.register)
router.post('/login', Controllers.login)

export default router
