const OrderModel= require("../models/orderModel")
const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")


const createOrder = async function(req,res){
   let data = req.body
  let checkUserId = await UserModel.findById({_id:data.userId })
//   return res.send({msg:checkUserId })
  if(!checkUserId){
return res.send({msg: "invalud user"})
  }

  let checkProductId = await ProductModel.findById({_id:data.productId})
  if(!checkProductId){
    return res.send({msg : "invalid product"})
  }
  let savedData = await OrderModel.create(data)
  return res.send({msg:savedData})

  
    

   
   
    
    
    

   
   
//     let savedData = await OrderModel.create(data)
//    return res.send({msg:savedData})
}
module.exports.createOrder = createOrder
