const newAuthorModel = require("../models/newAuthorModel")
const newPublisherModel = require("../models/newPublisherModel")
const newBookModel= require("../models/newBookModel")

 
const createBook= async function (req, res) {
    let book = req.body
    let authorId = book.author
    if(!authorId){
        return res.send({msg:"not prsnt"})
    }
    let savedData = await newBookModel.create(book)
    res.send({msg:savedData})

}
const checkAuthorId = async function(req,res){
    let checkId = req.body
    let isItTrue = checkId.author
    if({isItTrue:{$eq:author.ObjectId}}){
        return res.send({msg:checkId})
    }

module.exports.checkAuthorId= checkAuthorId


// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }

module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
