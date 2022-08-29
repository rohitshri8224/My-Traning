const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
        
        firstName : String,
        lastName : String,
        mobile : String,
        emailId : String,
        password: String,
        gender : {
            type :String,
            enum:["male","female","others"]
        },
        isDeleted: {
            typr : Boolean,
            default : false
        }, 
        age : Number,
       
    
})

module.exports = mongoose.model('xUser', userSchema)




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// const userSchema = new mongoose.Schema( {
//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,

//         required: true
//     },
//     emailId: String,
//     password: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "other"]
//     },
//     age: Number,
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema)
