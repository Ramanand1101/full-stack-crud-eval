const mongoose=require("mongoose")

const linkedinSchema=mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments:Number
       
})
const LinkedinModel=mongoose.model("post",linkedinSchema)

module.exports={
   LinkedinModel
}


