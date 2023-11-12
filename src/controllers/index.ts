import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getBlog,
  getBlogById,
  likeBlog,
  updateBlog,
  uploadImageBlog
} from './blog.controller'
import { createBlogCategory, deleteBlogCategory, getBlogCategory, updateBlogCategory } from './blogCategory.controller'
import { createBrand, deleteBrand, getBrand, updateBrand } from './brand.controller'
import { createCoupon, deleteCoupon, getCoupon, updateCoupon } from './coupon.controller'
import { createOrder, deleteOrder } from './order.controller'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  ratings,
  updateProduct,
  uploadImageProduct
} from './product.controller'
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategory,
  updateProductCategory
} from './productCategory.controller'
import {
  deleteUser,
  getUser,
  getUsers,
  updateCart,
  updateUser,
  updateUserAddress,
  updateUserByAdmin
} from './user.controller'

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
  updateUserAddress: updateUserAddress,
  updateCart: updateCart,
  // Product
  createProduct: createProduct,
  getProduct: getProduct,
  getProducts: getProducts,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  ratings: ratings,
  // ProductCategory
  createProductCategory: createProductCategory,
  getProductCategory: getProductCategory,
  updateProductCategory: updateProductCategory,
  deleteProductCategory: deleteProductCategory,
  uploadImageProduct: uploadImageProduct,
  // Blog Category
  createBlogCategory: createBlogCategory,
  getBlogCategory: getBlogCategory,
  updateBlogCategory: updateBlogCategory,
  deleteBlogCategory: deleteBlogCategory,
  // Blog
  createBlog: createBlog,
  getBlog: getBlog,
  getBlogById: getBlogById,
  updateBlog: updateBlog,
  deleteBlog: deleteBlog,
  likedBlog: likeBlog,
  dislikeBlog: dislikeBlog,
  uploadImageBlog: uploadImageBlog,
  // Brand
  createBrand: createBrand,
  getBrand: getBrand,
  updateBrand: updateBrand,
  deleteBrand: deleteBrand,
  // Coupon
  createCoupon: createCoupon,
  getCoupon: getCoupon,
  updateCoupon: updateCoupon,
  deleteCoupon: deleteCoupon,
  // Order
  createOrder: createOrder,
  deleteOrder: deleteOrder,
}

export default Controllers
