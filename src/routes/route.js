const express = require('express');
const router = express.Router()
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middeleware/auth")

router.get("/blogs",middleware.verifyAuthor,blogController.getBlogs)
router.post("/authors",authorController.createAuthor)
router.post("/blogs",middleware.verifyAuthor,blogController.createBlog)
router.put("/blogs/:blogId",middleware.verifyAuthor,middleware.authorisation,blogController.updateBlog)
router.delete("/blogs",middleware.verifyAuthor, middleware.authorisation, blogController.deleteBlogs)
router.delete("/blogs/:blogId",middleware.verifyAuthor,middleware.authorisation, blogController.removeBlog)
router.post("/login",authorController.login)

//for demo purposes
router.get("/demo",authorController.demoAuthorAll)
router.get("/demoblog",authorController.demoBlogAll)

module.exports = router
  