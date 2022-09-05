const blogModel = require("../models/blogModel")
const authorModel = require('../models/authorModel')

const getBlogs = async function(req,res){

   try{ const query = req.query
    console.log(query)
    const data = await blogModel.find(query)

    if(data.length==0)
    {
        res.status(404).send({status:false, msg:""})
    }
    else
    {
        res.status(200).send({status:true, data:data})

    }}catch(err)
    {
        res.status(500).send({status:false,msg:err.message})
    }
}

//create post api

const createBlog = async function(req,res){
    try{
    let blog = req.body
    let authorId = blog.authorId
    if(authorId){
        let author_id = await authorModel.findById(authorId)
        if(author_id){
            let createBlogs =  await blogModel.create(blog)
            res.status(201).send({status:true, data:createBlogs})
        }else{
            res.status(400).send({status:false,msg:'Invalid Author Id !'})
        }
    }else{
        res.status(404).send({status:false,msg:'Invalid Author Id !'})
    }
}catch(err){
    res.status(500).send({error:err.message})
}
}


module.exports.createBlog=createBlog
module.exports.getBlogs = getBlogs