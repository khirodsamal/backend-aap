const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/notemodel")
const jwt=require("jsonwebtoken")
const {authenticate}=require("../moddleware/authenticate")



noteRouter.get("/mynotes",authenticate,async(req,res)=>{
     console.log(req.body)
    try {
        const notes = await NoteModel.find({ userID: req.body.userID});
        console.log(notes)
        if(notes.length!==0){
            res.status(200).send({"message":notes})
        }else{
            res.status(404).send({"message":"not found"})
        }
        
    } catch (error) {
        res.status(500).send({"message":"something went wrong please try again"})
        console.log(error)
    }
    
})


noteRouter.post("/add",authenticate,async(req,res)=>{
    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note has been added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

noteRouter.patch("/update/:noteID",authenticate,async(req,res)=>{
    const payload=req.body
    const noteID=req.params.noteID
    try {
        const movie=await NoteModel.findByIdAndUpdate({_id:noteID,userID: req.body.userID},payload)
        res.status(200).send({"message":"update successfull"})
    } catch (error) {
        res.status(500).send({"message":"something went  wrong"})
        console.log(error)
    }
})

noteRouter.delete("/deletenote/:noteID",authenticate, async(req,res)=>{
  noteID=req.params.noteID
  try {
    await NoteModel.findByIdAndDelete({_id:noteID,userID: req.body.userID})
    res.status(200).send({"message":"delet successfull"})
  } catch (error) {
    res.status(500).send({"message":"something went  wrong"})
    console.log(error)
  }
})


module.exports={noteRouter}