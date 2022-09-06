const authorModel = require("../models/authorModel")
const createAuthor = async function(req,res){
   
   try{ 
    let data = req.body

    //email validation
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)))
     return res.status(400).send({staus:true, error:'Invalid Email Id'})

     //First name validation
     if (!/^[a-zA-Z.]{5,10}$/.test(data.fname))
     return res.status(400).send({staus:true, error:'Only alphabets !!'})

     //Last name validation
     if (!/^[a-zA-Z.]{5,10}$/.test(data.lname))
     return res.status(400).send({staus:true, error:'Only alphabets !!'})
    
     //password validation
     if(/^?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(data.password))
     return res.status(400).send({status:false, error:'Length should be 8 or more!'})
    
    let savedData = await authorModel.create(data)
    res.status(201).send({msg:savedData})
   }
   catch(err){
    return res.status(500).send({error: err.message})
   }
}

module.exports.createAuthor = createAuthor