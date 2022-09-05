const blogModel = require("../models/blogModel")

const getBlogs = function(req,res){

   try{ const query = req.query
    console.log(query)
    const data = blogModel.find(query)

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

module.exports.getBlogs = getBlogs