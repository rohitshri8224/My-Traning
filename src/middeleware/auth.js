const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel");

// verifying token
const verifyAuthor = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({ status:false, msg: "token not present" });
    }
    let validation = jwt.verify(token, "vro party all night!!!!!!!!");
 
    if (!validation) {
      return res.status(401).send({status:false, msg:'Invalid token'});
    } 
    let authorId = validation.loginId
    let finalId = await authorModel.findById(authorId)
    if(!finalId)
     return res.status(404).send({status:false, msg:'Author doesnt exist'});
    next(); 
    //check if author exists

  } catch (err) {
    if (err.name === 'JsonWebTokenError') {    
      res.status(401).send({"error" : err.message})}
    else 
    return res.status(500).send({ error: err });
   
}}

const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let finalId

    if(!req.query.authorId)
    {
    let blogId = req.params.blogId;
    if(!blogId)
    return res.status(400).send({ status: false, msg: "no blogId given"})
    let blog = await blogModel.findById(blogId);
    if(!blog || blog.isDeleted == true)
    return res.status(400).send({ status: false, msg: "blog doesnt exist"})
    finalId = blog.authorId.toString();
  }
    else {finalId = req.query.authorId}
    let validation = jwt.verify(token, "vro party all night!!!!!!!!");

    let loggedinUser = validation.loginId;
    if (finalId !== loggedinUser) {
      return res
        .status(403)
        .send({ status: false, msg: "invalid user not allowed" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports.verifyAuthor = verifyAuthor;
module.exports.authorization = authorization;
