import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import { getUser } from './user.controller'

const Controllers = {
  register: Register,
  login: Login,
  getUser: getUser,
  refreshToken: RefreshToken,
  logout: Logout
}

export default Controllers
