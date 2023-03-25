const mongoose=require("mongoose")
const noteSchema=mongoose.Schema({
    sub:String,
    title:String,
    content:String,
    userID: String
},{
    versionKey:false
})

const NoteModel=mongoose.model("Note",noteSchema)
module.exports={NoteModel}