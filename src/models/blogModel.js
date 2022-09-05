const mongoose = require('mongoose')
const objectId= mongoose.Schema.Types.objectId
const blogSchema = new mongoose.Schema({

title: {type: String, requred : true},
 body: {type:String, requred: true }, 
 authorId: {type:objectId, required: true ,ref:Author }, 
 tags: [String],
 category: {type: String, required:true}, 
    subcategory: [String],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPublished : {
        type: Boolean,
        default: false
    }

 })

 module.exports= mongoose.model("Blog",blogSchema)