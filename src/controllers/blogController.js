const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

//==============================================create post api====================================================

const createBlog = async function (req, res) {
  try {
    let blog = req.body; 

    let createBlogs = await blogModel.create(blog);
    res.status(201).send({ status: true, data: createBlogs });
  }
   catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//=====================================================get blog================================================
const getBlogs = async function (req, res) {
  try {
    const query = req.query;
    const comp = ["subcategory", "category", "tags", "authorId"]
    if (!Object.keys(query).every(elem => comp.includes(elem)))
      return res.status(400).send({ status: false, msg: "wrong query parameters" });

    const temp = { isDeleted: false, isPublished: true };

    const final = Object.assign({}, query, temp);

    let data = await blogModel.find(final).populate("authorId");
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

    if (blog.tags) objarr["tags"] = blog.tags
    if (blog.subcategory) objarr["subcategory"] = blog.subcategory
    if (blog.body) obj["body"] = blog.body
    if (blog.title) obj["title"] = blog.title
    if (blog.category) obj["category"] = blog.category
  

    if(!Object.keys(obj).length && !Object.keys(objarr).length)
    return res.status(400).send({error:'Enter valid field name'})

    obj["isPublished"] = true
    obj["publishedAt"] = Date.now()

    const allBlogs = await blogModel.findOneAndUpdate({ _id: blogId }, { $push: objarr, $set: obj }, { new: true })
    //if no update?
    res.status(200).send({ data: allBlogs })

  } catch (err) {
    return res.status(500).send({ error: err.message })
  }

}

// ===============================================update blog by using params==============================================

    const removeBlog = async function (req, res) {
    try {
  
    let blogId = req.params.blogId

    if(Object.keys(req.query).length)
     return res.status(400).send({msg:"query not allowed"})

    let deletedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true })
  return res.status(200).send({data:deletedBlog})
  }
    catch (err) {
    return res.status(500).send({ error: err.message })
  }
}

//==================================================update blog by using query============================================
const deleteBlogs = async function (req, res) {

  try {
    const query = req.query;

    //deleting for valid authorId only
    
    const temp = { isDeleted: false , authorId:req.authorId.toString()};
    const final = Object.assign({}, query, temp);

    let data = await blogModel.updateMany(final, { isDeleted: true, deletedAt: Date.now() }, { new: true });
      
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