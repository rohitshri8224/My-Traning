const authorModel = require("../models/authorModel")




//================validation for author====================


const authorValidation = async function(req, res , next){
try{  let data = req.body
  let title = ["Mr", "Mrs", "Miss"]
 
  //If no data in body
  if(Object.keys(data).length==0)
  return res.status(400).send({status:false, msg:'All fields are Required'})
  
  //for fname
  if(!data.fname)
  return res.status(400).send({status:false, msg:'fname required'})
 
  //for lname
  if(!data.lname)
  return res.status(400).send({status:false, msg:'lname required'})
  
  // for title
  if(!data.title)
  return res.status(400).send({status:false, msg:'title required'})
  if(!title.includes(data.title))
  return res.status(400).send({status:false, msg:'Select one of this: [Mr, Mrs, Miss] '})
  
  //for email
  if(!data.email)
  return res.status(400).send({status:false, msg:'email required'})
  let emailId =req.body.email
  console.log(emailId)
  let matchedEmail = await authorModel.find({email:emailId})

  if(matchedEmail.email == data.email)
  return res.status(400).send({status:false, msg:'Enter new email Id'})
 
  //for password
  if(!data.password)
  return res.status(400).send({status:false, msg:'password required'})

      //email validation
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)))
    return res.status(400).send({staus:false, msg:'Invalid Email Id'})

    //First name validation
    if (!(/^[a-zA-Z.]{5,10}$/).test(data.fname))
    return res.status(400).send({staus:false, msg:'Only alphabets !!'})
    
    //Last name validation
    if (!(/^[a-zA-Z.]{5,10}$/).test(data.lname))
    return res.status(400).send({staus:false, msg:'Only alphabets !!'})

    //password validation
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(data.password))
return res.status(400).send({status:false , msg:'Atleat 1 capital, 1 small, numbers and Length should be 8 or more!'})
     
  
  next()
}
catch(err){
    return res.status(500).send({status:false, msg:err.message})
}
}

//==================blog create validation=========

const blogCreateValidataion = function(req,res,next){
try{    
    let data = req.body

    const comp = ["subcategory", "category", "tags", "authorId","title","body"]
    if (!Object.keys(data).every(elem => comp.includes(elem)))
    return res.status(400).send({ status: false, msg: "wrong field !" });



    //validation for data
    if(Object.keys(data).length==0)
    return res.status(400).send({status:false, msg:'All fields are Required'})

    //validation for title
    if(!data.title)
    return res.status(400).send({status:false, msg:'title required'})

    //validation for body
    if(!data.body)
    return res.status(400).send({status:false, msg:'body required'})

    //validation for tags
    if(!data.tags)
    return res.status(400).send({status:false, msg:'tags required'})
    
    if(data.tags == '' || !/^[a-zA-Z ]+$/.test(data.tags))
    return res.status(400).send({error:'Invalid tags format ! ONLY ALPHABETS ALLOWED'})

    //validation for category
    if(!data.category)
    return res.status(400).send({error:'category required'})
    if(data.category == '' || !/^[a-zA-Z ]+$/.test(data.category))
    return res.status(400).send({error:'Invalid Category format ! ONLY ALPHABETS ALLOWED'})

    //validation for subcategory
    if(!data.subcategory)
    return res.status(400).send({status:false, msg:'subcategory required'})
    
    if(data.subcategory == '' || !/^[a-zA-Z ]+$/.test(data.subcategory))
    return res.status(400).send({error:'Invalid subcategory format ! ONLY ALPHABETS ALLOWED'})

    // validation for title and body
   if (!/^[a-zA-Z0-9 :-]+$/.test(data.title) || (!/^[a-zA-Z0-9.,'"!? :-]+$/.test(data.body))) {
    return res.status(400).send({ status: false, message: 'Special character not allowed ! Except : -' })
  }
  

    next()
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

//=================update blog validation=================

const blogUpdateValidation = function(req, res, next){
 try{
      let data = req.body

      if(Object.keys(data).length == 0)
      return res.status(400).send({status:false, msg:'Empty field not allowed'})

      if(data.title == '' || !/^[a-zA-Z0-9 :-]+$/.test(data.title))
      return res.status(400).send({error:'Invalid title format ! ONLY ALPHA-NUMERIC ALLOWED'})

      if(data.body == '' || !/^[a-zA-Z0-9.!"'? :-]+$/.test(data.body))
      return res.status(400).send({status:false, msg:'Invalid body format ! ONLY ALPHA-NUMERIC, (. ! " ? : -) ALLOWED'})

      if(data.tags == '' || !/^[a-zA-Z ]+$/.test(data.tags))
      return res.status(400).send({status:false, msg:'Invalid tags format ! ONLY ALPHABETS ALLOWED'})

      if(data.category == '' || !/^[a-zA-Z ]+$/.test(data.category))
      return res.status(400).send({error:'Invalid Category format ! ONLY ALPHABETS ALLOWED'})

      if(data.subcategory == '' || !/^[a-zA-Z ]+$/.test(data.subcategory))
      return res.status(400).send({status:false, msg:'Invalid subcategory format ! ONLY ALPHABETS ALLOWED'})

      next()
}
catch(err){
    return res.status(500).send({status:false, msg:err.message})
}
}

module.exports.authorValidation=authorValidation
module.exports.blogCreateValidataion=blogCreateValidataion
module.exports.blogUpdateValidation=blogUpdateValidation