const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({

//<<<<<<< HEAD
    title: { type: String, requred: true },
    body: { type: String, requred: true },
    authorId: { type: objectId, required: true, ref: "Author" },
    tags: [String],
    category: { type: String, required: true },
    subcategory: [String],
    isDeleted: {
        type: Boolean,
        default: false
    },

    isPublished: {
//=======
title: {
    type: String, 
    required : true},
 body: {
    type:String, 
    required: true 
}, 
 authorId: {
    type:objectId, 
    required: true,
    ref:"Author" 
}, 
 tags: [String],
 category: {
    type: String, 
    required:true
}, 
subcategory: [String],
isDeleted: {
    type: Boolean,
    default: false
    },
isPublished : {
//>>>>>>> 3bb892006fe59688fcee11b4085502279ebcb88e
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("Blog", blogSchema)