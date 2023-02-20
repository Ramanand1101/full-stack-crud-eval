const express=require("express")
const { LinkedinModel}=require("../Model/linkdln.model")

const  linkedinRouter=express.Router()

linkedinRouter.get("/",async(req,res)=>{
    let query=req.query
    try{
        const notes=await LinkedinModel.find(query)
        res.send(notes)
    }
    catch(err){
        res.send({"msg":"Cannot get the users","error":err.message})
    }
})
//=======================create post =====================================
linkedinRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try{
        const note=new LinkedinModel(payload)
        await note.save()
        res.send("Post Uploaded")
    }
    catch(err){
        res.send({"msg":"Not created Notes","error":err.message})

    }
 
   
})
//========================== Delete post =============================

linkedinRouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id
    await NoteModel.findByIdAndDelete({_id:postID})
    res.send({"msg":`Note with id:${postID} has been Deleted`})
})

linkedinRouter.patch("/update/:id",async(req,res)=>{
    const postID=req.params.id
    await LinkedinModel.findByIdAndUpdate({_id:postID})
    res.send({"msg":`Post with id:${postID} has been updated`})
})


module.exports={
    linkedinRouter
}
