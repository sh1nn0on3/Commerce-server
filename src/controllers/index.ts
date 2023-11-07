import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import { deleteUser, getUser, getUsers, updateUser, updateUserByAdmin } from './user.controller'

const Controllers = {
  register: Register,
  login: Login,
  refreshToken: RefreshToken,
  logout: Logout,
  getUser: getUser,
  getUsers: getUsers,
  deleteUser: deleteUser,
  updateUser : updateUser,
  updateUserByAdmin : updateUserByAdmin,
}

export default Controllers
