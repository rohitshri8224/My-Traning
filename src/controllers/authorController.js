const authorModel = require("../models/authorModel")
const jwt = require("jsonwebtoken")
const blogModel = require("../models/blogModel");


//==============================================create author==================================================
const createAuthor = async function(req,res){
   
   try{ 
    let data = req.body

     let savedData = await authorModel.create(data)
     res.status(201).send({status:true,data:savedData})
   }
   catch(err){
    return res.status(500).send({ status: false, msg: err.message})
   }
}

// ==================================================token genration================================================

const login = async function (req, res) {
try{
   let emailId = req.body.email
   let password = req.body.password
   let loginUser = await authorModel.findOne({ email: emailId, password: password })
   if (!loginUser || !(loginUser.email == emailId && loginUser.password == password)) {
       return res.status(401).send({  status: false, msg: "invalid Login details" })
   }
   let jwtToken = jwt.sign(
       {
           loginId: loginUser._id.toString(),
           userStatus: "active",
           app: "myBlog"
       },
       "vro party all night!!!!!!!!"

   )

    res.status(200).send({ status: true , data:jwtToken})
      }
      catch(err){
         return res.status(500).send({ status: false, msg:err.message})
      } 
}
//======================================our purpose only======================================================================
const demoAuthorAll = async function(req,res)
{
    let demo = await authorModel.find()

    res.send(demo)
}
//--------------------------------------------------------------------------------------------------------------------------
const demoBlogAll = async function(req,res)
{
    // let demo = await blogModel.find()
    let demo = await blogModel.updateMany({isDeleted:true},{isDeleted:false})

    res.send(demo)
}

//====================================================================================================================================
module.exports.createAuthor = createAuthor
module.exports.login = login
module.exports.demoAuthorAll = demoAuthorAll
module.exports.demoBlogAll = demoBlogAll