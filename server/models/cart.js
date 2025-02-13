const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  items: [
    {
      productId: String,
      name:String,
      price:Number,
      description:String, 
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
