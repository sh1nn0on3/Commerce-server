import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'

const router = Router()

// user
router.get('/profile', Controllers.getUser)
router.put('/update', Controllers.updateUser)
router.delete('/delete', Controllers.deleteUser)
//admin
router.get('/total', middlewares.isAdmin, Controllers.getUsers)
router.put('/updateByAdmin', middlewares.isAdmin, Controllers.updateUserByAdmin)

export default router
