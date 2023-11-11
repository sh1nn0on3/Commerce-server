const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    sold: {
      type: Number,
      default: 0
    },
    images: {
      type: Array,
      default: []
    },
    quantity: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      enum: ['Black', 'Brown', 'Silver', 'White', 'Blue']
    },
    ratings: [
      {
        star: Number,
        comment: String,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    totalRating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Product', productSchema)
