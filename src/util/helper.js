const date = function(){

    let currentDate = new Date()
    currentDate = currentDate.getDate()
    console.log(currentDate)
}

const month = function(){

    let currentDate = new Date()
    currentMonth = currentDate.getMonth()
    console.log(currentMonth + 1)
}

const info = function(){

    console.log("Plutonium,week:3, day:5,tpoic:node.js module")
}

module.exports.printDate = date
module.exports.printMonth = month
module.exports.getBatchInfo = info