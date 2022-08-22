const newPublisherModel = require("../models/newPublisherModel")

const createPublisher = async function(req,res){
    let data = req.body
    let savedData = await newPublisherModel.create(data)
    res.send({msg:savedData})
}

module.exports.createPublisher=createPublisher