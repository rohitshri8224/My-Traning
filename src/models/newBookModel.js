const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const newBookSchema = new mongoose.Schema({


    name: String,
    author: {
        type: ObjectId,
        ref: "newauthor"


    },
    price: Number,
    ratings: Number,
    publisher: {
        type: ObjectId,

        ref: "publisher"
    },
    isHardCover: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

// const bookSchema = new mongoose.Schema({
//     name: String,
//     author: {
//         type: ObjectId,
//         ref: "author-abc"


//     },
//     price: Number,
//     ratings: Number,
//     publisher: {
//         type: ObjectId,

//         ref: "publisher-abc"
//     },
//     isHardCover: {
//         type: Boolean,
//         default: false
//     }

// },{timestamps:true})


module.exports = mongoose.model('NewLibraryBook', newBookSchema)
//module.exports = mongoose.model('allBook',bookSchema)
