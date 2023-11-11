const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var AddressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('BlogCategory', AddressSchema)