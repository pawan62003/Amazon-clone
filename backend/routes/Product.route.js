const express = require('express')

const ProductRoute = express.Router();
const {ProductModel} = require('../models/Product.model')

ProductRoute.get('/',async(req,res)=>{
    const {
        category,
        sub_category,
        title,
        brand,
        type,
        rating,
        price,
        sort,
        page,
        limit,
      } = req.query;
      const query = {};
      const newPage = page || 1;
      const newLimit = limit || 12;
      const skip = (newPage - 1) * newLimit;
      if (category) query.category = category || {};
      if (sub_category) query.sub_category = sub_category || {};
      if (brand) query.brand = brand;
      if (type) query.type = type;
      if (title) query.title = new RegExp(title, "i") || {}; // case-insensitive search
      if (!title) query.category = "electronics"; // case-insensitive search
      if (rating) {
        if (rating.length === 1) {
          query.rating = { $gte: Number(rating[0]) };
        } else if (rating.length > 1) {
          query.$or = [];
          for (let i = 0; i < rating.length; i++) {
            let obj = {};
            obj.rating = { $gte: Number(rating[i]) };
            query.$or.push(obj);
          }
        }
      }
      //filter by price
      if (price) {
        if (+price[1] !== 0) {
          query.price = { $gte: Number(price[0]), $lte: Number(price[1]) };
        }
      }
    
      //  all type of sorting
      const sorting = {};
      if (sort) {
        console.log(sort);
        const sortBy = sort[0];
        const order = sort[1];
        if (order === "asc") {
          sorting[sortBy] = 1;
        } else {
          sorting[sortBy] = -1;
        }
      }
    
      try {
        // const products = await ProductModel.find(query).sort(sorting);
        const products = await ProductModel.find(query)
          .skip(skip)
          .limit(newLimit)
          .sort(sorting);
    
        if (products.length === 0) {
          res.status(404).send({ message: "Product not available" });
        } else {
          const count = await ProductModel.countDocuments(query);
          res.status(200).send({
            products,
            currentPage: parseInt(newPage),
            totalPages: Math.ceil(count / newLimit),
          });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
      }
})

ProductRoute.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await ProductModel.findById({_id:id})
        res.send(product)
    } catch (error) {
        res.send({err:error})
    }
})

module.exports={
    ProductRoute
}