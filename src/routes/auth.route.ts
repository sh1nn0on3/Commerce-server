import { Router } from 'express'
import Controllers from '~/controllers'

const router = Router()

router.post('/register', Controllers.register)
router.post('/login', Controllers.login)
router.put('/logout', Controllers.logout)
router.put('/refreshtoken', Controllers.refreshToken)

export default router
