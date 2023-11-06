import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt, { Secret } from 'jsonwebtoken'
import { EncodeBase64 } from '~/utils/base64'

const GenerateAccessToken = (id: string, role: string, name: string) => {
  const token = jwt.sign({ id, role, name }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRE
  })
  const encodedToken = EncodeBase64(token)
  return encodedToken
}

const GenerateRefreshToken = (id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE
  })
  const encodedToken = EncodeBase64(token)
  return encodedToken
}

// const VerifyAccessToken = ( token: string) => {
//   const decodedToken = jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
//     if (err) return { status: 401, message: 'Invalid token' }
//     return { status: 200, message: 'Valid token', data: decoded }
//   })
//   return decodedToken
// }

export { GenerateAccessToken, GenerateRefreshToken }
