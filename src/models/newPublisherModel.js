const mongoose = require('mongoose');

const newPublisherSchema = new mongoose.Schema({
    name: String,
    headQuarter: String,
    
},{timestamps: true })

// const publisherSchema = new mongoose.Schema({
//     name: String,
//     headQuarter: String,
    
// },{timestamps: true })


module.exports = mongoose.model('publisher', newPublisherSchema)
//module.exports = mongoose.model('publisher-abc',publisherSchema)