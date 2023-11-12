import { Request, Response } from 'express'

const Coupon = require('~models/Coupon')
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req: Request, res: Response | any) => {
  const { name, discount, numberOfCoupon, expire } = req.body
  if (!name || !discount || !numberOfCoupon || !expire) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const newCoupon = await Coupon.create({ ...req.body, expire: Date.now() + Number(expire * 24 * 60 * 60 * 1000) })
  if (newCoupon) res.status(200).json({ sucess: true, msg: 'Coupon created', data: newCoupon })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})

const getCoupon = asyncHandler(async (req: Request, res: Response | any) => {
  const coupon = await Coupon.find()
  if (coupon) res.status(200).json({ sucess: true, msg: 'Coupon found', data: coupon })
  else res.status(404).json({ sucess: false, msg: 'Coupon not found' })
})

const updateCoupon = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  const { name, discount, numberOfCoupon, expire } = req.body
  if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  const response = await Coupon.findByIdAndUpdate(
    id,
    { ...req.body, expire: Date.now() + Number(expire * 24 * 60 * 60 * 1000) },
    { new: true }
  )
  if (!response) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
  return res.status(200).json({ sucess: true, msg: 'Update Category ', data: response })
})

const deleteCoupon = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (!id) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const response = await Coupon.findByIdAndDelete(id)
  if (!response) return res.status(404).json({ sucess: false, msg: 'Coupon not found' })
  return res.status(200).json({ sucess: true, msg: 'Delete Category' })
})

export { createCoupon, getCoupon, updateCoupon, deleteCoupon }
