import { Router } from 'express'
import Controllers from '~/controllers'

const router = Router()

router.post('/register', Controllers.register)

export default router
