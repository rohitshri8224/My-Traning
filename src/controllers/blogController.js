const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

const getBlogs = async function (req, res) {
  try {
    const query = req.query;
    const temp = { isDeleted: false, isPublished: true };
    //console.log()
    const final = Object.assign({}, query, temp);

      let data = await blogModel.find(final);
      if (data.length == 0)
        res.status(404).send({ status: false, msg: "no such data" });
      else res.status(200).send({ status: true, data: data });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//create post api

const createBlog = async function (req, res) {
  try {
    let blog = req.body;
    let authorId = blog.authorId;
    if (!authorId)
      return res.status(404).send({ status: false, msg: "Required Author Id !" });

    let author_id = await authorModel.findById(authorId);
    if (!author_id)
      return res.status(400).send({ status: false, msg: "Invalid Author Id !" });

    let createBlogs = await blogModel.create(blog);
     res.status(201).send({ status: true, data: createBlogs });
  }  catch (err) {
      res.status(500).send({ error: err.message });
  }
};

module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
