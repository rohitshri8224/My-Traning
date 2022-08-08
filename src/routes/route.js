const express = require('express');
const abc = require('../introduction/intro')
const loggerModule = require('../logger/loger')
const helperModule = require('../util/helper')
const formatterModule = require('../validator/formatter')

const router = express.Router();
const lodash = require('lodash');
const { chunk } = require('lodash');

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    //res.send('My second ever api!')
    res.send('rohit shrivastava')
    loggerModule.welcomyToMyApplication()
    helperModule.printDate()
    helperModule.printMonth()
    helperModule.getBatchInfo()
    formatterModule.trimName()
    formatterModule.changeToLowerCase()
    formatterModule.changeToUpperCase()

    const months = ['jan','feb','mar','apr','may','june','jul','aug','sep','oct','nov','dec']
    console.log(lodash.chunk(months,[size=4]))

    const oddNum = [1,3,5,7,9,11,13,15,17,190]
     console.log(lodash.tail(oddNum))

     const arr = ([1,2],[2,3],[3,4],[2,4],[5,4])
     console.log(lodash.union(arr))

     const chngToObj =( ['comedy','hera-pheri']['action','john wick'],['sci-fi','passengers'])
     console.log(lodash.fromPairs(chngToObj))

    
});




router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason