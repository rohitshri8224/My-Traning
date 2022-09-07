const express = require('express');
const router = express.Router()
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middeleware/auth")

// const blogController = require('../controllers/blogController')

router.get("/blogs",middleware.verifyAuthor,blogController.getBlogs)
router.post("/authors",authorController.createAuthor)
router.post("/blogs",middleware.verifyAuthor,blogController.createBlog)
router.put("/blogs/:blogId",middleware.verifyAuthor,middleware.authrization,blogController.updateBlog)
router.delete("/blogs",middleware.verifyAuthor,blogController.deleteBlogs)
router.delete("/blogs/:blogId",middleware.verifyAuthor,blogController.removeBlog)

router.post("/login",authorController.login)

module.exports = router
  