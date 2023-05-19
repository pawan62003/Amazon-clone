const express = require('express')
const OrderRoute = express.Router();
const {OrderModel} = require('../models/order.model')

OrderRoute.get('/',async(req,res)=>{
    try {
        const data = await OrderModel.find({userID:req.body.userID})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

OrderRoute.post('/',async(req,res)=>{
    try {
        const order = new OrderModel({...req.body,qty:1})
        await order.save()
        res.send({msg:"your have successfully ordered your product"})
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    OrderRoute
}