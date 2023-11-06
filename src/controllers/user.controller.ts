import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'

const User = require('~models/User')

const getUser = asyncHandler(async (req: Request, res: Response | any) => {
  const uid = req.body.userId
  const user = await User.findById(uid.id)
  if (!user) return res.status(404).json({ sucess: false, msg: 'User not found' })
  const data = {
    data: user
  }
  return res.status(200).json({ sucess: true, msg: 'User found', data: data })
})

export { getUser }
