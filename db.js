const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.error(err.message)
})



const animeschema=new mongoose.Schema({
    title:{type:String},
    Genre:{type:String}
})

const animelist=mongoose.model("animes",animeschema)

module.exports=animelist;