const express=require("express")
const app=express()
app.use(express.json())
const connect=require("./db")
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("wellcome")
})

const userrouter=require("./routes/user.rout")
app.use("/",userrouter)

const {noteRouter}=require("./routes/notes.rout")
app.use("/",noteRouter)



app.listen(process.env.port,async()=>{
    try {
        await connect
        console.log("connect to db")
    } catch (error) {
        
    }
    console.log(`server is running at ${process.env.port}`)
})