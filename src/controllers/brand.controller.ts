import { Request, Response } from 'express'

const Brand = require('~models/Brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async (req: Request, res: Response | any) => {
  const newBrand = await Brand.create(req.body)
  if (newBrand) res.status(200).json({ sucess: true, msg: 'Brand created', data: newBrand })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})

const getBrand = asyncHandler(async (req: Request, res: Response | any) => {
  const brand = await Brand.find().select('title _id')
  if (brand) res.status(200).json({ sucess: true, msg: 'Brand found', data: brand })
  else res.status(404).json({ sucess: false, msg: 'Brand not found' })
})

const updateBrand = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (!id) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  const response = await Brand.findByIdAndUpdate(id, req.body, { new: true })
  if (!response) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
  return res.status(200).json({ sucess: true, msg: 'Update Category ', data: response })
})

const deleteBrand = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (!id) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const response = await Brand.findByIdAndDelete(id)
  if (!response) return res.status(404).json({ sucess: false, msg: 'Brand not found' })
  return res.status(200).json({ sucess: true, msg: 'Delete Category' })
})

export { createBrand, getBrand, updateBrand, deleteBrand }
