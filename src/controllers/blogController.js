const blogModel = require("../models/blogModel");


//==============================================create post api====================================================

const createBlog = async function (req, res) {
  try {
    let blog = req.body; 
    let nid = Object.assign({},{publishedAt:null,deletedAt:null},blog)
    let yid = Object.assign({},{publishedAt:Date.now(),deletedAt:null},blog)

    if(blog.isPublished)
    {let createBlogs = await blogModel.create(yid);
      return res.status(201).send({ status: true, data: createBlogs })
    }
    else
    {let createBlogs = await blogModel.create(nid);
      return res.status(201).send({ status: true, data: createBlogs });
    }
    
  }
   catch (err) {
    res.status(500).send({  status: false, msg: err.message });
  }
};

//=====================================================get blog================================================

const getBlogs = async function (req, res) {
  try {
    const query = req.query;

      //valid query keys given-----------------------------------
    const comp = ["subcategory", "category", "tags", "authorId"]
    if (!Object.keys(query).every(elem => comp.includes(elem)))
      return res.status(400).send({ status: false, msg: "wrong query parameters" });
    //empty query value
    if(!Object.values(query).every((elem) =>{if(!elem) {return false} else {return true} }))
    return res.status(400).send({ status: false, msg: "Empty query paramater given" });
    
    if(query.authorId)
    {if (!query.authorId.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send({ status: false, msg: "invalid authorId given" });
   }
    const temp = { isDeleted: false, isPublished: true };
     
    // merging two objects 
    const final = Object.assign({}, query, temp);

    let data = await blogModel.find(final).populate("authorId");
    //if nothing found-----------------------------------

    if (data.length == 0)
      res.status(404).send({ status: false, msg: "blog doesn't exist" });
    else res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


//======================================================update blog================================================ 

const updateBlog = async (req, res) => {
  try {
    let blog = req.body;
    let blogId = req.params.blogId
    let obj = {}
    let objarr = {}
    //seperating array and string values-----------------------------------
    if (blog.tags) objarr["tags"] = blog.tags
    if (blog.subcategory) objarr["subcategory"] = blog.subcategory
    if (blog.body) obj["body"] = blog.body
    if (blog.title) obj["title"] = blog.title
    if (blog.category) obj["category"] = blog.category
    
    let nid = Object.assign({},{publishedAt:null},obj)
    let yid = Object.assign({},{publishedAt:Date.now()},obj)

    if(blog.isPublished)
    {const allBlogs = await blogModel.findOneAndUpdate({ _id: blogId }, { $push: objarr, $set: yid }, { new: true })
    return res.status(200).send({ status: true, data: allBlogs, message:"" });
    }
    else
    {const allBlogs = await blogModel.findOneAndUpdate({ _id: blogId }, { $push: objarr, $set: nid }, { new: true })
      return res.status(200).send({ status: true, data: allBlogs, message:"" });
    }

    //if no update?-----------------------------------

  } catch (err) {
    return res.status(500).send({  status: false, msg: err.message })
  }

}

// =============================================== update blog by using params ==============================================

    const removeBlog = async function (req, res) {
    try {
  
    let blogId = req.params.blogId
      //if queries given-----------------------------------
    if(Object.keys(req.query).length)
     return res.status(400).send({ status: false, msg:"query not allowed"})

    let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, deletedAt: Date.now() }, { new: true })
  return res.status(200).send({status:true,data:deletedBlog})
  }
    catch (err) {
    return res.status(500).send({  status: false, msg: err.message })
  }
}

//==================================================update blog by using query============================================
const deleteBlogs = async function (req, res) {

  try {
    const query = req.query;

    //deleting for authorised authorId only-----------------------------------
    const temp = { isDeleted: false , authorId:req.authorId.toString()};
    const final = Object.assign({}, query, temp);

    let data = await blogModel.updateMany(final, { isDeleted: true, deletedAt: Date.now() }, { new: true });
     //if nothing is updated-----------------------------------
    if (data.matchedCount == 0)
        res.status(404).send({ status: false, msg: "blog doesn't exist" });
    else
        res.status(200).send({ status: true, msg: data });

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }

}
//===========================================================================================================================

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.deleteBlogs = deleteBlogs
module.exports.removeBlog = removeBlog
module.exports.updateBlog = updateBlog