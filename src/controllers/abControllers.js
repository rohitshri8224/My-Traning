const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel = require("../controllers/abControllers")

const authorData = async function(req,res){
    let data = req.body
    let savedData = await AuthorModel.create(data)
    res.send({msg:savedData})
}
module.exports.authorData = authorData