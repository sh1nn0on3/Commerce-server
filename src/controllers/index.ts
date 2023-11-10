import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import { createProduct, deleteProduct, getAllProducts, getProduct, getProducts, updateProduct } from './product.controller'
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
  getAllProducts : getAllProducts,
  getProducts: getProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
}

export default Controllers
