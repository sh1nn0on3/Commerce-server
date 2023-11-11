import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import { createProduct, deleteProduct, getProduct, getProducts, ratings, updateProduct } from './product.controller'
import { deleteUser, getUser, getUsers, updateUser, updateUserByAdmin } from './user.controller'

const Controllers = {
  // Auth
  register: Register,
  login: Login,
  refreshToken: RefreshToken,
  logout: Logout,
  getUser: getUser,
  getUsers: getUsers,
  deleteUser: deleteUser,
  updateUser: updateUser,
  updateUserByAdmin: updateUserByAdmin,
  // Product
  createProduct: createProduct,
  getProduct: getProduct,
  getProducts: getProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  // Ratings
  ratings: ratings
}

export default Controllers
