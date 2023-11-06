import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'

const router = Router()
router.get('/getuser', middlewares.VerifyAccessToken, Controllers.getUser)

router.put('/updateuser', Controllers.refreshToken)

export default router
