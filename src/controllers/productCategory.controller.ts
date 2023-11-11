import { Request, Response } from 'express'

const ProductCategory = require('~models/ProductCategory')
const asyncHandler = require('express-async-handler')

const createProductCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const newProductCategory = await ProductCategory.create(req.body)
  if (newProductCategory)
    res.status(200).json({ sucess: true, msg: 'ProductCategory created', data: newProductCategory })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})

const getProductCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const productCategory = await ProductCategory.find().select("title _id")
  if (productCategory) res.status(200).json({ sucess: true, msg: 'ProductCategory found', data: productCategory })
  else res.status(404).json({ sucess: false, msg: 'ProductCategory not found' })
})

const updateProductCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  const response = await ProductCategory.findByIdAndUpdate(id, req.body, { new: true })
  if (!response) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
  return res.status(200).json({ sucess: true, msg: 'Update Category ', data: response })
})

const deleteProductCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (!id) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const response = await ProductCategory.findByIdAndDelete(id)
  if (!response) return res.status(404).json({ sucess: false, msg: 'ProductCategory not found' })
  return res.status(200).json({ sucess: true, msg: 'Delete Category' })
})

export { createProductCategory, getProductCategory, updateProductCategory, deleteProductCategory }
