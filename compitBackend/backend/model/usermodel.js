const mongoose=require("mongoose")

const userSchma=mongoose.Schema({
    name:{
        type:String,
        required:true, 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    versionKey:false
})

const userModel=mongoose.model("user",userSchma)
module.exports={userModel}