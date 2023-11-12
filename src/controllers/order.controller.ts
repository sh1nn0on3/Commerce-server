import { Request, Response } from 'express'

const Order = require('../models/Order')
const User = require('../models/User')
const Coupon = require('../models/Coupon')
const asyncHandler = require('express-async-handler')

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body.userId
  const { coupon } = req.body
  let totalAfterDiscount: any
  const { cart } = await User.findById(id).select('cart').populate('cart.product', '_id title price')
  const products = cart?.map((item: any) => ({
    product: item.product._id,
    count: item.quantity,
    color: item.color
  }))
  const total = cart?.reduce((sum: any, item: any) => sum + item.product.price * item.quantity, 0)

  if (coupon && total) {
    const couponDiscount = await Coupon.findOneAndUpdate(
      { name: coupon },
      { $inc: { numberOfCoupon: -1 } },
      { new: true }
    )
    if (!couponDiscount || couponDiscount.numberOfCoupon <= 0)
      return res.json({ success: false, message: 'Coupon not found or Coupon has expired ' })
    const discount = Math.floor((total * couponDiscount.discount) / 100)
    totalAfterDiscount = Math.floor((total - discount) / 1000) * 1000
  }
  const newOrder = await Order.create({
    products: products ? products : '',
    coupon: coupon ? coupon : '',
    total: coupon ? totalAfterDiscount : total,
    orderedBy: id
  })
  return res.json({
    success: true,
    message: 'Order created successfully',
    data: newOrder
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
