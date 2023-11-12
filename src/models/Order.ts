const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        count: Number,
        color: String
      }
    ],
    status: {
      type: String,
      default: 'Processing',
      enum: ['Not Processed', 'Processing', 'Dispatched', 'Cancelled', 'Completed']
    },
    total: Number,
    coupon: String,
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Order', OrderSchema)
