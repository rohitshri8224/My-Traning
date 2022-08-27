const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const ProductController = require("../controllers/productController")
const OrderController = require("../controllers/orderController")
const UserModel = require("../models/userModel")
//const OrderController = require("../controllers/orderController")
//const BookController= require("../controllers/bookController")
const commonMW = require ("../middlewares/commonMiddlewares")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


const mid1 = function(req,res,next){
    console.log("hii this is mid1")

    let header = req.headers

    if(!header.isfreeappuser){ 
         return res.send("The request feild is missing a mandatory header")
         
    }next()
}

router.post("/createUser", UserController.createUser)
router.post("/createProduct",ProductController.createProduct)
router.post("/createOrder",mid1,OrderController.createOrder)



// const mid3= async function(req,res,next){
//     console.log("hii this is mid3")
//     let data = req.body
//     if(!data.userId){
//         return res.send({msg:"UserId is mandatory"})
//     }else{
//     let checkUserId = await UserModel.findById({_id:data.userId})
//     return res.send({msg:"not present"})
    
//     }next()
// }





// router.get("/getUsersData", UserController.getUsersData)


// const mid1= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid1")
//     // logic
//     let loggedIn = false

//     if (loggedIn== true) { 
//         console.log( "OK LOGGED IS IS TRUE NOW")
//         next ()
//     }
//     else {
//         res.send ("Please login or register")
//     }
// }

// // e.g. restricted and open-to-all API's can be handled like below now:
// router.get('/homePage', mid1, UserController.feeds)
// router.get('/profileDetails', mid1, UserController.profileDetails)
// router.get('/friendList', mid1, UserController.friendList)
// router.get('/changePassword', mid1, UserController.changePassword)

// router.get('/termsAndConditions',  UserController.termsAndConditions)
// router.get('/register',  UserController.register)





//router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, UserController.basicCode)



// router.get("/basicRoute2", commonMW.mid1, UserController.basicCode2)
// router.get("/basicRoute3", commonMW.mid2, UserController.basicCode3)
// router.get("/basicRoute4", commonMW.mid1, commonMW.mid4, UserController.basicCode4)




module.exports = router;