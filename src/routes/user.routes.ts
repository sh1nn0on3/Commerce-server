import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'

const router = Router()

router.get('/getuser', Controllers.getUser)
router.get('/getusers', middlewares.isAdmin, Controllers.getUsers)

export default router
