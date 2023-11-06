import Jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { GenerateAccessToken, GenerateRefreshToken } from '~/middlewares/auth.middleware'
import { LoginService, LogoutService, RefreshTokenService, RegisterService } from '~/services/auth.services'
import { IResponse } from '~/types'
import { DecodeBase64 } from '~/utils/base64'

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

const RefreshToken = asyncHandle(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.status(401).json({ sucess: false, msg: 'No token provided' })
  const decodedToken = DecodeBase64(refreshToken)
  const response: IResponse | any = await RefreshTokenService(decodedToken)
  if (response.status === 200) {
    res.cookie('refreshToken', response.data?.refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
  }
  return res
    .status(response.status)
    .json({ sucess: response.status === 200 ? true : false, msg: response.message, data: response?.data })
})

const Logout = asyncHandle(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.status(401).json({ sucess: false, msg: 'No token provided' })
  const decodedToken = DecodeBase64(refreshToken)
  const response: IResponse | any = await LogoutService(decodedToken)
  if (response.status === 200) res.cookie('refreshToken', '', { httpOnly: true, maxAge: 0 })
  return res.status(response.status).json({ sucess: response.status === 200 ? true : false, msg: response.message })
})

export { Register, Login, RefreshToken, Logout }
