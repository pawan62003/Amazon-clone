const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    sub_category: { type: String },
    type: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    brand: { type: String },
    adminID:{type:String,required:true}
  },
  { versionKey: false }
  )

  const ProductModel = mongoose.model('product',ProductSchema);

  module.exports={
    ProductModel
  }