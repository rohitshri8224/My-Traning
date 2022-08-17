const express = require('express');
const router = express.Router();
//const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
const BookModel = require("../models/bookModel")
const BookController= require("../controllers/bookController")

//Assignment:-

router.post('/createbook',BookController.createBook)

//------------------------------------------------------------------------------------------------------------------
// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createUser", UserController.createUser  )

// router.get("/getUsersData", UserController.getUsersData)

// router.post("/createBook", BookController.createBook  )

// router.get("/getBooksData", BookController.getBooksData)

module.exports = router;