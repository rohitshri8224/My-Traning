const jwt = require("jsonwebtoken");

const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

const verifyAuthor = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.send({ msg: "token not present" });
    }
    let validation = jwt.verify(token, "vro party all night!!!!!!!!");
    if (!validation) {
      return res.status(403).send({});
    }
    next();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const authrization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let blogId = req.params.blogId;
    let userId = await blogModel.findById(blogId);
    let finalId = userId.authorId.toString();
    let validation = jwt.verify(token, "vro party all night!!!!!!!!");
    console.log(validation);
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
module.exports.authrization = authrization;
