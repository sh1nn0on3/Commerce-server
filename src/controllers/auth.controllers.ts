import { Request, Response } from 'express'
import { LoginService, RegisterService } from '~/services/auth.services'
import { IResponse } from '~/types'

const User = require('~models/User')
const asyncHandle = require('express-async-handler')

const Register = asyncHandle(async (req: Request, res: Response) => {
  const response: IResponse = await RegisterService(req.body)
  return res
    .status(response.status)
    .json({ sucess: response.status === 200 ? true : false, msg: response.message, data: response.data })
})

const Login = asyncHandle(async (req: Request, res: Response) => {
  const response: IResponse = await LoginService(req.body)
  if (response.status === 200) {
    res.cookie('refreshToken', response.data?.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
  }
  return res
    .status(response.status)
    .json({ sucess: response.status === 200 ? true : false, msg: response.message, data: response.data })
})

export { Register, Login }
