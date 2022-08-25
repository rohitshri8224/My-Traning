const newAuthorModel = require("../models/newAuthorModel")
const newPublisherModel = require("../models/newPublisherModel")
const newBookModel= require("../models/newBookModel")

 
const createBook= async function (req, res) {
    let book = req.body
    if(!book.author){
       return res.send({msg:"author absent"})
    }
    let checkAuthorId = await newAuthorModel.findById(book.author)
   
    if (!book.publisher){
      return res.send({msg:"publisher absent"})
    }
    let checkPublisherId = await newPublisherModel.findById(book.publisher)
    if(!checkPublisherId){
      return res.send({msg:"publisher id wrong"})
    }
    let savedData = await newBookModel.create(book)
    res.send({mag:savedData})

  
}
const getAllData = async function(req,res){
  let data = await newBookModel.find().populate('author').populate('publisher')
  res.send({data:data})
}




const createNewBook = async function(req,res){
  let data = req.body
  let savedData = await newBookModel.create(data)
  res.send({msg:savedData})
}
const book = async function(req,res){
  
  let updateBoolean = await newBookModel.updateMany({$or:[{publisher:Penguin},{publisher:HarperCollins},{$set:{isHardCover:true}}]})
  res.send({msg:updateBoolean})
}


module.exports.createBook= createBook
module.exports.getAllData=getAllData
//module.exports.createNewBook = createNewBook
//module.exports.book = book


// const checkAuthorId = async function(req,res){
//     let checkId = req.body
//     let isItTrue = checkId.author
//     if({isItTrue:{$eq:author.ObjectId}}){
//         return res.send({msg:checkId})
//     }

// module.exports.checkAuthorId= checkAuthorId


// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }


// module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
