import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const router = Router()

router.post('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.createBlog)
router.get('/', Controllers.getBlog)
router.put('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.updateBlog)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteBlog)
router.post('/like', [middlewares.VerifyAccessToken], Controllers.likedBlog)
router.post('/dislike', [middlewares.VerifyAccessToken], Controllers.dislikeBlog)

export default router
