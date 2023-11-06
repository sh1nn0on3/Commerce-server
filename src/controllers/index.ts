import { Register, Login } from './auth.controllers'
import { getUser } from './user.controller'

const Controllers = {
  register: Register,
  login: Login,
  getUser: getUser
}

export default Controllers
