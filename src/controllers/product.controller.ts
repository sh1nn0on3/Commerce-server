const Product = require('~models/Product')
const asyncHandler = require('express-async-handler')

import { Request } from 'express'

const createProduct = asyncHandler(async (req: Request, res: Request | any) => {
  const { name, price, description, category, images } = req.body
  if (!name || !price || !description || !category || !images)
    return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const product = await Product.findOne({ name })
  if (product) return res.status(400).json({ sucess: false, msg: 'Product already exists' })
  const newProduct = await Product.create(req.body)
  return res.status(200).json({ sucess: true, msg: 'Product created', data: newProduct })
})

export { createProduct }
