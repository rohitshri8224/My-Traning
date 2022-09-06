const express = require('express');
const router = express.Router()
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")

// const blogController = require('../controllers/blogController')

router.get("/blogs",blogController.getBlogs)
router.post("/authors",authorController.createAuthor)
router.post("/blogs",blogController.createBlog)
router.put("/blogs/:blogId",blogController.updateBlog)
router.delete("/blogs",blogController.deleteBlogs)
router.delete("/blogs/:blogId",blogController.removeBlog)

module.exports = router
  