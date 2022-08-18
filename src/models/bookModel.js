const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema( {
//     bookName: String, 
//     authorName: String, 
//     tags: [String],
    
//     isPublished: Boolean,
//     prices: {
//         indianPrice: String,
//         europePrice: String,
//     },
//     sales: {type: Number, default: 10}
// }, { timestamps: true });


//module.exports = mongoose.model('Book', bookSchema) //users

//Assignment:-

const bookSchema = new mongoose.Schema({
    bookName : String,
    price : {indianPrice:String,europeanPrice:String},
    year :{type : Number,Default:2021},
    tags : [String],
    authorName : String,
    totalPages:Number,
    stockAvailable : Boolean

})
module.exports = mongoose.model('Book',bookSchema)
//----------------------------------------------------------------------------------------------------------------
//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
