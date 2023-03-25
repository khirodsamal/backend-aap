const express=require("express")
const userRouter=express.Router()
const {userModel}=require("../model/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { Router } = require("express")
const {authenticate}=require("../moddleware/authenticate")


userRouter.post("/register",async(req,res)=>{
    console.log(req.body)
    const {name,email,password}=req.body
    try {
        // checking is there the emailid is already present or not
        const existemail=await userModel.findOne({email})
        console.log(existemail)
        if(existemail){
            return res.status(400).send({"message":"email is already registerd"})
        }
        // encode the password and store
        bcrypt.hash(password,7,async(error,hash)=>{
            if(error){
                return res.status(500).send({"message":"something went wrong"})
                console.log(error)
            }
            const user=new userModel({name,email,password:hash})
            await user.save()
            res.status(200).send({"message":"register successfully"})
        })
       
    } catch (error) {
        res.status(500).send({"message":"something went wrong"})
        console.log(err)
    }
})


userRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try {
        const user=await userModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token=jwt.sign({"userID":user._id},"masai",{expiresIn: '1h' })
                    res.status(200).send({"message":"login succesfull","token":token})
                }else{
                    return res.status(400).send({"message":"wrong password"})
                }
            })
        }else{
            res.status(400).send({"message":"put correct mailID"})
        }
    } catch (error) {
        res.status(500).send({"message":"something went wrong"});
        console.log(error)
    }
})



// userRouter.get("/notes",authenticate,async(req,res)=>{
//  try {
//     // const notes=await NoteModel.find({"userID":decoded.userID})
//     // console.log(notes)
//     res.status(200).send({"message":"notes"})
//  } catch (error) {
//     res.status(500).send({"message":"somethig went wrong"})
//  }
// })


module.exports=userRouter