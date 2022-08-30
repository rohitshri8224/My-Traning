const jwt = require("jsonwebtoken");
const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
  
    //If no token is present in the request header return error
    if (!token) return res.send({ status: false, msg: "token must be present" });  
  
    let decodeToken = jwt.verify(token ,"functionup-plutonium")
    if(!decodeToken){
        return res.send({msg: "invalid token"})
    }
    req.loggedinUser = decodeToken.UserId

    next()
}


const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    let requestedUserId = req.params.userId
    
    
   if( requestedUserId!==req.loggedinUser ){
    return res.send({msg:"not present"})
   }
    next()
}

module.exports.authenticate = authenticate
module.exports.authorise  = authorise 