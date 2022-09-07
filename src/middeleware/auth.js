const jwt = require("jsonwebtoken");

const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

const verifyAuthor = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.send({ msg: "token not present" });
    }
    let validation = jwt.verify(token, "vro party all night!!!!!!!!");

    if (!validation) {
      return res.status(403).send({});
    }
    let authorId = validation.loginId
    let finalId = await authorModel.findById(authorId)
    if(!finalId)
     return res.status(403).send({});
    next();
    //check if author exists

  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const authorisation = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let finalId

    if(!req.query.authorId)
    {
    let blogId = req.params.blogId;
    if(!blogId)
    return res.status(400).send({ status: false, msg: "no blogId given"})
    let userId = await blogModel.findById(blogId);
    if(!userId)
    return res.status(400).send({ status: false, msg: "invalid userID"})
    finalId = userId.authorId.toString();}
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
module.exports.authorisation = authorisation;
