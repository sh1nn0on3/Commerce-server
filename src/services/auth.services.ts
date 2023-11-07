import { IRegister } from '~/types'
import bcrypt from 'bcrypt'
import { GenerateAccessToken, GenerateRefreshToken } from '~/middlewares/auth.middleware'

const User = require('~models/User')

export const RegisterService = async (dataBody: IRegister) => {
  const { name, mobile, email, password } = dataBody
  if (!name || !mobile || !email || !password) return { status: 400, message: 'Please enter all fields' }

  const user = await User.findOne({ email })
  if (user) return { status: 400, message: 'User already exists' }

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  const dataInsert = {
    name: name,
    email: email,
    mobile: mobile,
    password: hash
  }
  const response = await User.create(dataInsert)
  const data = {
    _id: response._id,
    name: response.name,
    email: response.email,
    mobile: response.mobile
  }
  return { status: 200, message: 'User registered', data: data }
}

export const LoginService = async (dataBody: IRegister) => {
  const { email, password } = dataBody
  if (!email || !password) return { status: 400, message: 'Please enter all fields' }

  const user = await User.findOne({ email })
  if (!user) return { status: 400, message: 'User does not exists' }

  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) return { status: 400, message: 'Invalid credentials' }
  const accessToken = GenerateAccessToken(user._id, user.role, user.name)
  const refreshToken = GenerateRefreshToken(user._id)
  await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true })

  const dataUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role
  }

  return { status: 200, message: 'User logged in', data: { accessToken, refreshToken, dataUser } }
}
