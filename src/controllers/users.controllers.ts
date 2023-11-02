import { Request, Response } from 'express'
// import { registerService } from '~/services'

const User = require('~models/User')
const asyncHandle = require('express-async-handler')

const Register = asyncHandle(async (req: Request, res: Response) => {
  const { name, email, mobile, password } = req.body
  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ sucess: false, msg: 'Please enter all fields' })
  }
  const response = await User.create(req.body)
  return res.status(200).json({ sucess: response ? true : false, msg: 'User registered' })
})

export { Register }
