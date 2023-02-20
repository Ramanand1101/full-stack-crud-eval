const express=require("express")
const {connection}=require("./db")
require('dotenv').config()
const {userRouter}=require("./router/user.router")
const {linkedinRouter}=require("./router/linkdln.router")
const {authenticate}=require("./middleware.authenticate/middleware.authenticate")
const cors=require("cors")


const app=express()

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
   res.send("Home Page")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/linkedin",linkedinRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log("Cannot connected to DB")
        console.log(err)
    }
    console.log("Server running in the Port 4101")
})