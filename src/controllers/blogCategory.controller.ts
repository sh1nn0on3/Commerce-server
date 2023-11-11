import { Request, Response } from 'express'

const BlogCategory = require('~models/BlogCategory')
const asyncHandler = require('express-async-handler')

const createBlogCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const newBlogCategory = await BlogCategory.create(req.body)
  if (newBlogCategory) res.status(200).json({ sucess: true, msg: 'BlogCategory created', data: newBlogCategory })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})

const getBlogCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const blogCategory = await BlogCategory.find().select('title _id')
  if (blogCategory) res.status(200).json({ sucess: true, msg: 'BlogCategory found', data: blogCategory })
  else res.status(404).json({ sucess: false, msg: 'BlogCategory not found' })
})

const updateBlogCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  const response = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true })
  if (!response) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
  return res.status(200).json({ sucess: true, msg: 'Update Category ', data: response })
})

const deleteBlogCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (!id) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const response = await BlogCategory.findByIdAndDelete(id)
  if (!response) return res.status(404).json({ sucess: false, msg: 'BlogCategory not found' })
  return res.status(200).json({ sucess: true, msg: 'Delete Category' })
})

export { createBlogCategory, getBlogCategory, updateBlogCategory, deleteBlogCategory }
