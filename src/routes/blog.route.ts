import { Router } from 'express'
import Controllers from '~/controllers'
import middlewares from '~/middlewares'
const uploadCloud = require('~config/cloudinary.config')
const router = Router()

router.post('/', [middlewares.VerifyAccessToken], Controllers.createBlog)
router.get('/', Controllers.getBlog)
router.patch('/', Controllers.getBlogById)
router.put('/', [middlewares.VerifyAccessToken], Controllers.updateBlog)
router.delete('/', [middlewares.VerifyAccessToken, middlewares.isAdmin], Controllers.deleteBlog)
router.post('/like', [middlewares.VerifyAccessToken], Controllers.likedBlog)
router.post('/dislike', [middlewares.VerifyAccessToken], Controllers.dislikeBlog)
router.post('/upload', [middlewares.VerifyAccessToken], uploadCloud.single("image")  , Controllers.uploadImageBlog)

export default router
