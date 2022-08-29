const express = require('express');
const router = express.Router();
const user1Controller= require("../controllers/user1Controller")
const userController= require("../controllers/userController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/abc",user1Controller.registerUser)
router.post("/loginUser",user1Controller.loginUser)
//router.get("/xUser/:userId ",user1Controller.getUser)  
router.get("/user/:userId ",user1Controller.details)




//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// router.post("/users", userController.createUser  )

// router.post("/login", userController.loginUser)

// //The userId is sent by front end
// router.get("/users/:userId", userController.getUserData)

router.put("/users/:userId", userController.updateUser)

module.exports = router;