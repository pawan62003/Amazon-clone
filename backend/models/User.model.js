const express = require('express');
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{required:true,type:String},
    email:{required:true,type:String},
    password:{required:true,type:String},
    mobile:{required:true,type:Number},
},{
    versionKey:false
})

const UserModel = mongoose.model('user',UserSchema);

module.exports={
    UserModel
}

