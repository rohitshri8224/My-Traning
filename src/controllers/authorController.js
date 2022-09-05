const authorModel = require("../models/authorModel")
const createAuthor = async function(req,res){
   
   try{ let data = req.body
    let savedData = await authorModel.create(data)
    res.status(201).send({msg:savedData})
   }
   catch(err){
    return res.status(500).send({error: err.message})
   }
}

module.exports.createAuthor = createAuthor