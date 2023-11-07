import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import { getUser, getUsers } from './user.controller'

const Controllers = {
  register: Register,
  login: Login,
  getUser: getUser,
  getUsers: getUsers,
  refreshToken: RefreshToken,
  logout: Logout
}

export default Controllers
