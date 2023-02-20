const express=require("express")
require('dotenv').config()
const{UserModel}=require("../Model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()

//======================================= SIGN-UP code here =====================================================
userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,password,age,city}=req.body
    try{
        bcrypt.hash(password, 5,async(err, hash)=> {
            if(err) res.send({"msg":"Something Went Wrong","error":err.message})
            else{
                const user=new UserModel({name,email,gender,password:hash,age,city})
                await user.save()
                res.send("User has been Registered")
            }
        });
    }catch(err){
        res.send({"msg":"User not registered","error":err.message})

    }
})

//======================================== LOGIN code here ============================================================

userRouter.post("/login",async(req,res)=>{
    const {email,password}=(req.body)
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err, result)=>{
                if(result==true){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in Succeful","token":token})
                }
                else{
                    res.send({"msg":"Wrong Credientials"})
                }

            });
        }
        else{
            res.send({"msg":"Wrong Credientials"})
        }
        
    }catch(err){
        res.send({"msg":"Something Went Wrong","error":err.message})
    }
})
module.exports={
    userRouter
}
