const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    sub_category: { type: String },
    type: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    brand: { type: String },
    qty:{type:Number,required:true},
    userID:{type:String,required:true}
  },
  { versionKey: false }
  )

  const CartModel = mongoose.model('cart',CartSchema);

  module.exports={
    CartModel
  }