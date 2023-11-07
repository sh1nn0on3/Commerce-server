const User = require('~models/User')

import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

const getUser = asyncHandler(async (req: Request, res: Response | any) => {
  const uid = req.body.userId
  const user = await User.findById(uid.id).select('-password -role -refreshToken -__v')
  if (!user) return res.status(404).json({ sucess: false, msg: 'User not found' })
  return res.status(200).json({ sucess: true, msg: 'User found', data: user })
})

const getUsers = asyncHandler(async (req: Request, res: Response | any) => {
  const user = await User.find().select('-password -refreshToken -__v')
  if (!user) return res.status(404).json({ sucess: false, msg: 'User not found' })
  return res.status(200).json({ sucess: true, msg: 'User found', data: user })
})

const deleteUser = asyncHandler(async (req: Request, res: Response | any) => {
  const { _id } = req.query
  if (!_id) return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  const user = await User.findById(_id).select('-password -role -refreshToken -__v')
  if (user.role === 'admin' || user._id === _id) return res.status(401).json({ sucess: false, msg: 'Unauthorized' })
  const deleteUser = await User.findByIdAndDelete(_id)
  if (!deleteUser) return res.status(404).json({ sucess: false, msg: 'User not found' })
  return res.status(200).json({ sucess: true, msg: 'User found' })
})

const updateUser = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.body.userId
  if (!id || Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password -role -refreshToken -__v')
  if (!user) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
  return res.status(200).json({ sucess: true, msg: 'User found', data: user })
})

const updateUserByAdmin = asyncHandler(async (req: Request, res: Response | any) => {
  const { id } = req.query
  if (Object.keys(req.body).length === 1) return res.status(400).json({ sucess: false, msg: 'Missing inputs' })
  const user = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password -role -refreshToken -__v')
  if (!user) return res.status(404).json({ sucess: false, msg: 'Wrong ...' })
  return res.status(200).json({ sucess: true, msg: 'User found', data: user })
})

export { getUser, getUsers, deleteUser, updateUser, updateUserByAdmin }
