import { Request, Response } from 'express'
import { LoginService, RegisterService } from '~/services/users.services'
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
  return res
    .status(response.status)
    .json({ sucess: response.status === 200 ? true : false, msg: response.message, data: response.data })
})

export { Register, Login }
