import { IRegister } from '~/types'
import bcrypt from 'bcrypt'

const User = require('~models/User')

export const RegisterService = async (dataBody: IRegister) => {
  const { name, mobile, email, password } = dataBody
  if (!name || !mobile || !email || !password) {
    return {
      status: 200,
      message: 'Please enter all fields'
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
