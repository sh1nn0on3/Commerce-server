const Product = require('~models/Product')
const asyncHandler = require('express-async-handler')

import { Request, Response } from 'express'
import slugify from 'slugify'

const createProduct = asyncHandler(async (req: Request, res: Response | any) => {
  if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
  const newProduct = await Product.create(req.body)
  if (newProduct) res.status(201).json({ sucess: true, msg: 'Product created', data: newProduct })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})

const getProduct = asyncHandler(async (req: Request, res: Response | any) => {
  const { pid } = req.query
  const product = await Product.findById(pid)
  if (product) res.status(200).json({ sucess: true, msg: 'Product found', data: product })
  else res.status(404).json({ sucess: false, msg: 'Product not found' })
})

const getProducts = asyncHandler(async (req: Request, res: Response | any) => {
  const products = await Product.find()
  if (products) res.status(200).json({ sucess: true, msg: 'Products found', data: products })
  else res.status(404).json({ sucess: false, msg: 'Products not found' })
})

const updateProduct = asyncHandler(async (req: Request, res: Response | any) => {
  const { pid } = req.query
  if (Object.keys(req.body).length === 0) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  console.log("🚀 ~ file: product.controller.ts:31 ~ updateProduct ~ Object.keys(req.body):", Object.keys(req.body))
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
  const product = await Product.findByIdAndUpdate(pid, req.body, { new: true })
  if (product) res.status(200).json({ sucess: true, msg: 'Product updated', data: product })
  else res.status(404).json({ sucess: false, msg: 'Product not found' })
})

const deleteProduct = asyncHandler(async (req: Request, res: Response | any) => {
  const { pid } = req.query
  const product = await Product.findByIdAndDelete(pid)
  if (product) res.status(200).json({ sucess: true, msg: 'Product deleted' })
  else res.status(404).json({ sucess: false, msg: 'Product not found' })
})

export { createProduct, getProduct, getProducts, updateProduct, deleteProduct }
