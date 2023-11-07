import Jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { DecodeBase64 } from '~/utils/base64'

const VerifyAccessToken = asyncHandler(async (req: Request, res: Response | any, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ sucess: false, msg: 'No token provided' })
  const decodedToken = DecodeBase64(token as any)
  Jwt.verify(decodedToken, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return res.status(401).json({ sucess: false, msg: 'Invalid token' })
    req.body.userId = decoded
    next()
  })
})

const isAdmin = asyncHandler(async (req: Request, res: Response | any, next: NextFunction) => {
  const { role } = req.body.userId
  if (role !== 'admin') return res.status(401).json({ sucess: false, msg: 'Unauthorized' })
  next()
})

export { VerifyAccessToken , isAdmin }
