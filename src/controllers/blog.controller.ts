import { Request, Response } from 'express'

const BLog = require('~models/Blog')
const asyncHandler = require('express-async-handler')

const excludeFields = '_id name email mobile'

const createBlog = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.body.userId
  const { title, desciption, category } = req.body
  if (!title || !desciption || !category) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const newBlog = await BLog.create({ title, desciption, category, authur: id })
  if (newBlog) res.status(200).json({ sucess: true, msg: 'Blog created', data: newBlog })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})

const getBlog = asyncHandler(async (req: Request, res: Response | any) => {
  const blog = await BLog.find()
  if (blog) res.status(200).json({ sucess: true, msg: 'Blog found', data: blog })
  else res.status(404).json({ sucess: false, msg: 'Blog not found' })
})

const getBlogById = asyncHandler(async (req: Request, res: Response | any) => {
  const { bid } = req.query
  if (!bid) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const response = await BLog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
    .populate('likes', excludeFields)
    .populate('dislikes', excludeFields)
  if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
  return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
})

const updateBlog = asyncHandler(async (req: Request, res: Response | any) => {
  const { bid } = req.query
  if (!bid) return res.status(400).json({ sucess: false, msg: 'Miss ' })
  const { id, role } = req.body.userId
  const auth = await BLog.findById(bid).select('authur')
  if (!bid) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  if (id === auth.authur.toString() || role === 'admin') {
    if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
    const response = await BLog.findByIdAndUpdate(bid, req.body, { new: true })
    if (!response) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
    return res.status(200).json({ sucess: true, msg: 'Update Blog ', data: response })
  }
  return res.status(400).json({ sucess: false, msg: 'You are not authur' })
})

const deleteBlog = asyncHandler(async (req: Request, res: Response | any) => {
  const { bid } = req.query
  if (!bid) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const { id, role } = req.body.userId
  const auth = await BLog.findById(bid).select('authur')
  if (id === auth.authur.toString() || role === 'admin') {
    const response = await BLog.findByIdAndDelete(bid)
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Delete Blog' })
  }
  return res.status(400).json({ sucess: false, msg: 'You are not authur' })
})

const likeBlog = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.body.userId
  const { bid } = req.body
  if (!id || !bid) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const blog = await BLog.findById(bid)
  const alreadyDisLiked = blog.dislikes.find((el: any) => el.toString() === id.toString())
  if (alreadyDisLiked) {
    const response = await BLog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: id }, isDislinked: false, $push: { likes: id }, isLiked: true },
      { new: true }
    )
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
  }
  const isLiked = blog?.isLiked
  if (isLiked) {
    const response = await BLog.findByIdAndUpdate(bid, { $pull: { likes: id }, isLiked: false }, { new: true })
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
  } else {
    const response = await BLog.findByIdAndUpdate(bid, { $push: { likes: id }, isLiked: true }, { new: true })
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
  }
})

const dislikeBlog = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.body.userId
  const { bid } = req.body
  if (!id || !bid) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const blog = await BLog.findById(bid)
  const alreadyLiked = blog?.likes?.find((el: any) => el.toString() === id.toString())
  if (alreadyLiked) {
    const response = await BLog.findByIdAndUpdate(
      bid,
      { $pull: { likes: id }, isLiked: false, $push: { dislikes: id }, isDisliked: true },
      { new: true }
    )
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
  }
  const isDisliked = blog?.isDisliked
  if (isDisliked) {
    const response = await BLog.findByIdAndUpdate(bid, { $pull: { dislikes: id }, isDisliked: false }, { new: true })
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
  } else {
    const response = await BLog.findByIdAndUpdate(bid, { $push: { dislikes: id }, isDisliked: true }, { new: true })
    if (!response) return res.status(404).json({ sucess: false, msg: 'Blog not found' })
    return res.status(200).json({ sucess: true, msg: 'Blog found', data: response })
  }
})

export { createBlog, getBlog, getBlogById, updateBlog, deleteBlog, likeBlog, dislikeBlog }
