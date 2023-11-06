import { Register, Login, RefreshToken } from './auth.controllers'
import { getUser } from './user.controller'

const Controllers = {
  register: Register,
  login: Login,
  getUser: getUser,
  refreshToken: RefreshToken
}

export default Controllers
