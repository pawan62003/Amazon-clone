const express = require('express');
const { ProductModel } = require('../models/Product.model');
const AdminRoute = express.Router();

AdminRoute.post('/',async(req,res)=>{
    
    try {
        const findpro = await ProductModel.find({adminID:req.body.adminID,title:req.body.title})

        if(findpro.length>0){
            res.send({"msg":"this product is allready you have added"})
        }
        else{
            const addpro = new ProductModel(req.body)
            await addpro.save()
            res.send({"msg":"your product is successfully added in database"})
        }
    } catch (error) {
        res.send({err:error})
    }
})

AdminRoute.delete('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const data = await ProductModel.find({adminID:req.body.adminID,_id:id})
        if(data.length>0){
            const afterDelete = await ProductModel.findByIdAndDelete({_id:id})
            res.send({"msg":"item is successfully deleted"})
        }
        else{
            res.send({'msg':"you are not authrize person to do this operation"})
        }
    } catch (error) {
        res.send({err:error})
    }
})

AdminRoute.patch('/update/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const data = await ProductModel.find({adminID:req.body.adminID,_id:id})
        if(data.length>0){
            const afterUpdate = await ProductModel.findByIdAndUpdate({_id:id},req.body)
            res.send({"msg":"item is successfully update"})
        }
        else{
            res.send({'msg':"you are not authrize person to do this operation"})
        }
    } catch (error) {
        res.send({err:error})
    }
})



module.exports={
    AdminRoute
}