import Jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { GenerateAccessToken, GenerateRefreshToken } from '~/middlewares/auth.middleware'
import { LoginService, RegisterService } from '~/services/auth.services'
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
  Jwt.verify(decodedToken, process.env.JWT_SECRET as string, async (err, decoded) => {
    if (err) return res.status(401).json({ sucess: false, msg: 'Token Die ' })
    const { id }: any = decoded
    const user = await User.findOne({ _id: id, refreshToken: refreshToken })
    if (!user) return res.status(401).json({ sucess: false, msg: 'Invalid token' })
    const accessToken = GenerateAccessToken(user._id, user.role, user.name)
    const newRefreshToken = GenerateRefreshToken(user._id)
    await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true })
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
    return res
      .status(200)
      .json({ sucess: true, msg: 'Token refreshed', data: { accessToken, refreshToken: newRefreshToken } })
  })
})

const Logout = asyncHandle(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) return res.status(401).json({ sucess: false, msg: 'No token provided' })
  const decodedToken = DecodeBase64(refreshToken)
  Jwt.verify(decodedToken, process.env.JWT_SECRET as string, async (err, decoded) => {
    if (err) return res.status(401).json({ sucess: false, msg: 'Token Die ' })
    const { id }: any = decoded
    const user = await User.findOne({ _id: id, refreshToken: refreshToken })
    if (!user) return res.status(401).json({ sucess: false, msg: 'Invalid token' })
    await User.findByIdAndUpdate(user._id, { refreshToken: '' }, { new: true })
    res.cookie('refreshToken', '', { httpOnly: true, maxAge: 0 })
    return res.status(200).json({ sucess: true, msg: 'User logged out' })
  })
})

export { Register, Login, RefreshToken, Logout }
