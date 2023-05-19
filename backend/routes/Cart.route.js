const express = require('express')
const { CartModel } = require('../models/cart.model')
const CartRoute = express.Router()

CartRoute.post('/',async(req,res)=>{
    try {
        const cart = await CartModel.find({userID:req.body.userID,title:req.body.title})
        if(cart.length>0){
            res.send({msg:'item is allready added in your cart'})
        }else{
            const cartData = new CartModel({...req.body,qty:1})
            await cartData.save()
            res.send({'msg':'item is added in your cart'})
        }
    } catch (error) {
        res.send({'err':error})
    }
})

CartRoute.get('/',async(req,res)=>{
    try {
        const cartData = await CartModel.find({userID:req.body.userID})
        res.send(cartData)
    } catch (error) {
        res.send(error)
    }
})

CartRoute.patch('/update/:id',async(req,res)=>{
    const {id} = req.params
    try {
        try {
            const data = await CartModel.find({userID:req.body.userID,_id:id})
            if(data.length>0){
                const afterUpdate = await CartModel.findByIdAndUpdate({_id:id},req.body)
                res.send(afterUpdate)
            }
            else{
                res.send({msg:'you are not authrize person to do this operation'})
            }
        } catch (error) {
            res.send(error)
        }
    } catch (error) {
        res.send(error)
    }
})

CartRoute.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params
    try {
        try {
            const data = await CartModel.find({userID:req.body.userID,_id:id})
            if(data.length>0){
                const afterUpdate = await CartModel.findByIdAndDelete({_id:id})
                res.send({msg:"item is successfully deleted"})
            }
            else{
                res.send({msg:'you are not authrize person to do this operation'})
            }
        } catch (error) {
            res.send(error)
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports={
    CartRoute
}