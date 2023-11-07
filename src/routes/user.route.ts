import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'

const router = Router()

// user
router.get('/profile', Controllers.getUser)

//admin
router.get('/total', middlewares.isAdmin, Controllers.getUsers)

export default router
