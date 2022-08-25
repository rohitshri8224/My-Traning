const newAuthorModel= require("../models/newAuthorModel")

const createAuthor = async function(req,res){
    let data = req.body
    let savedData = await newAuthorModel.create(data)
    res.send({msg:savedData})
}


// const newAuthor = async function(req,res){
//     let data = req.body
//     let savedData = await newAuthorModel.create(data)
//     res.send({msg:savedData})
// }



module.exports.createAuthor = createAuthor
//module.exports.newAuthor = newAuthor