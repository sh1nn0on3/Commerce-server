const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    desciption: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    numberViews: {
      type: Number,
      default: 0
    },
    isLiked: {
      type: Boolean,
      default: false
    },
    isDisliked: {
      type: Boolean,
      default: false
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    image: {
      type: String,
      default: ''
    },
    authur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

//Export the model
module.exports = mongoose.model('blog', BlogSchema)
