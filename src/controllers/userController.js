const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}
const booksData =   async function(req,res){
    let dataBook = req.body
    let saveBookData = await UserModel.create(dataBook)
    res.send({msg:saveBookData})
}
const getBooksData = async function(req,res){
    let allBooks = await UserModel.find()
    res.send({msg:allBooks})
}
module.exports.booksData = booksData
module.exports.getBooksData = getBooksData
module.exports.createUser= createUser
module.exports.getUsersData= getUsersData