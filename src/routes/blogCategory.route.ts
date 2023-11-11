import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.createBlogCategory)
router.get('/', Controllers.getBlogCategory)
router.put('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.updateBlogCategory)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteBlogCategory)

export default router
