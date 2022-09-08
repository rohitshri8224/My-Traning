const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel");


const createAuthor = async function(req,res){
   
   try{ 
    let data = req.body

    //email validation
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)))
     return res.status(400).send({staus:true, error:'Invalid Email Id'})

     //First name validation
     if (!(/^[a-zA-Z.]{5,10}$/).test(data.fname))
     return res.status(400).send({staus:true, error:'Only alphabets !!'})

     //Last name validation
     if (!(/^[a-zA-Z.]{5,10}$/).test(data.lname))
     return res.status(400).send({staus:true, error:'Only alphabets !!'})
    
     //password validation
     if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(data.password))
     return res.status(400).send({status:false, error:'Atleat 1 capital, 1 small, numbers and Length should be 8 or more!'})
    
     let savedData = await authorModel.create(data)
     res.status(201).send({msg:savedData})
   }
   catch(err){
    return res.status(500).send({error: err.message})
   }
}

// token genration

const login = async function (req, res) {
try{
   let emailId = req.body.email
   let password = req.body.password
   let loginUser = await authorModel.findOne({ emailId: emailId, password: password })
   if (!loginUser) {
       return res.status(401).send({ msg: "invalid user" })
   }
   let jwtToken = jwt.sign(
       {
           loginId: loginUser._id.toString(),
           userStatus: "active",
           app: "myBlog"
       },
       "vro party all night!!!!!!!!"

   )
   res.setHeader("x-api-key",jwtToken)
    res.status(200).send({ status: true })
      }
      catch(err){
         return res.status(500).send({error:err.message})
      } 
}

const demoAuthorAll = async function(req,res)
{
    let demo = await authorModel.find()

    res.send(demo)
}
const demoBlogAll = async function(req,res)
{
    let demo = await blogModel.find()
    res.send(demo)
}


module.exports.createAuthor = createAuthor
module.exports.login = login
module.exports.demoAuthorAll = demoAuthorAll
module.exports.demoBlogAll = demoBlogAll