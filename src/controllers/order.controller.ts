import { Request, Response } from 'express'

const Order = require('../models/Order')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body.userId
  const { cart } = await User.findById(id).select('cart')
  const data = await Order.create({ products: cart, orderedBy: id })
  return res.json({
    success: true,
    message: 'Order created successfully',
    data: data
  })
})

const deleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body.userId
  const { pid } = req.query
  const userCart = await User.findById(id).select('cart')
  if (!userCart) return res.json({ success: false, message: 'User not found' })
  const order = await Order.findByIdAndDelete(pid)
  if (!order) return res.json({ success: false, message: 'Order not found' })
  return res.json({ success: true, message: 'Order deleted successfully', data: userCart })
})

export { createOrder, deleteOrder }
