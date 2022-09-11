const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

// ======================================verifying token======================================
const verifyAuthor = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).send({ status: false, msg: "token not present" });
    }
    let validation = jwt.verify(token, "vro party all night!!!!!!!!");

    if (!validation) {
      return res.status(401).send({ status: false, msg: "Invalid token" });
    }
    let authorId = validation.loginId;
    let finalId = await authorModel.findById(authorId);
    if (!finalId)
      return res
        .status(404)
        .send({ status: false, msg: "Author doesnt exist" });
    next();
    //=====================check if author exists================================
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).send({ error: err.message });
    } else return res.status(500).send({ error: err });
  }
};

//==================================Authorization======================================
const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let finalId;

    let validation = jwt.verify(token, "vro party all night!!!!!!!!");
    let loggedinUser = validation.loginId;
    //  For handling delete and update by id

    let blogId = req.params.blogId;
    if (!blogId)
      return res
        .status(400)
        .send({ status: false, msg: "no blogId  or authorId " });

    if (!blogId.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .send({ status: false, msg: "invalid blogId given" });

    let blog = await blogModel.findById(blogId);
    if (!blog || blog.isDeleted == true)
      return res.status(400).send({ status: false, msg: "blog doesnt exist" });

    finalId = blog.authorId.toString();
    if (finalId !== loggedinUser)
      return res
        .status(403)
        .send({ status: false, msg: "invalid user not allowed" });

    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//for handling delete by query

const authDeleteByQuery = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    let validation = jwt.verify(token, "vro party all night!!!!!!!!");
    let loggedinUser = validation.loginId;
    let query = req.query;

    const comp = ["subcategory", "category", "tags", "authorId", "isPublished"];
    if (!Object.keys(query).every((elem) => comp.includes(elem)))
      return res
        .status(400)
        .send({ status: false, msg: "wrong query paramater given" });

    if (query.isPublished == "true")
      return res
        .status(400)
        .send({ status: false, msg: "ispublished is true" });

    let findQuery = await blogModel.find(query);
    if (findQuery.length == 0)
      return res.status(404).send({ status: false, msg: "blog not found" });

    let newData = findQuery.filter((ele) => ele.authorId == loggedinUser);
    if (newData.length == 0)
      return res
        .status(403)
        .send({ status: false, msg: "unauthorised access" });

    let authId = newData[0].authorId;
    req["authorId"] = authId;

    next();
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

//===================================================================================================

module.exports.verifyAuthor = verifyAuthor;
module.exports.authorization = authorization;
module.exports.authDeleteByQuery = authDeleteByQuery;
