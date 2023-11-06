import { Router } from 'express'
import Controllers from '~/controllers'

const router = Router()

router.get('/getuser', Controllers.getUser)

export default router
