const ProductCategory = require('~models/ProductCategory')
const asyncHandler = require('express-async-handler')

const createProductCategory = asyncHandler(async (req: Request, res: Response | any) => {
  const newProductCategory = await ProductCategory.create(req.body)
  if (newProductCategory) res.status(201).json({ sucess: true, msg: 'ProductCategory created', data: newProductCategory })
  else res.status(400).json({ sucess: false, msg: 'Something went wrong' })
})



export { createProductCategory }
