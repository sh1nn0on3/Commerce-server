import { IRegister } from '~/types'
import bcrypt from 'bcrypt'

const User = require('~models/User')

export const RegisterService = async (dataBody: IRegister) => {
  const { name, mobile, email, password } = dataBody
  if (!name || !mobile || !email || !password) {
    return {
      status: 400,
      message: 'Please enter all fields'
    }
  }
  const user = await User.findOne({ email })
  if (user) {
    return {
      status: 400,
      message: 'User already exists'
    }
  }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  const dataInsert = {
    name: name,
    email: email,
    mobile: mobile,
    password: hash
  }
  const response = await User.create(dataInsert)
  return {
    status: 200,
    message: 'User registered',
    data: response
  }
}

export const LoginService = async (dataBody: IRegister) => {
  const { email, password } = dataBody
  if (!email || !password) {
    return {
      status: 400,
      message: 'Please enter all fields'
    }
  }
  const user = await User.findOne({ email })
  if (!user) {
    return {
      status: 400,
      message: 'User does not exists'
    }
  }
  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) {
    return {
      status: 400,
      message: 'Invalid credentials'
    }
  } else {
    return {
      status: 200,
      message: 'User logged in',
      data: user
    }
  }
}
