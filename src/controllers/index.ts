import { Register, Login, RefreshToken, Logout } from './auth.controllers'
import { createBlog, deleteBlog, dislikeBlog, getBlog, getBlogById, likeBlog, updateBlog } from './blog.controller'
import { createBlogCategory, deleteBlogCategory, getBlogCategory, updateBlogCategory } from './blogCategory.controller'
import { createProduct, deleteProduct, getProduct, getProducts, ratings, updateProduct } from './product.controller'
import {
  createProductCategory,
  deleteProductCategory,
  getProductCategory,
  updateProductCategory
} from './productCategory.controller'
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
  ratings: ratings,
  // ProductCategory
  createProductCategory: createProductCategory,
  getProductCategory: getProductCategory,
  updateProductCategory: updateProductCategory,
  deleteProductCategory: deleteProductCategory,
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
  dislikeBlog: dislikeBlog
}

export default Controllers
