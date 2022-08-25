const mongoose = require('mongoose');

const newAuthorSchema = new mongoose.Schema( {
authorName : String,
age   : Number,
address : String,
rating : Number
},{timestamps: true })

// const authorSchema = new mongoose.Schema( {
//     authorName : String,
//     age   : Number,
//     address : String,
//     rating : Number
//     },{timestamps: true })



module.exports = mongoose.model('newauthor', newAuthorSchema) 
//module.exports = mongoose.model('author-abc',authorSchema)
