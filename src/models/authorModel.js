const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({    

    author_id : Number,
    authorName : String,
    age : Number,
    address : String
} )




module.exports = mongoose.model("Author", authorSchema) //users
