const trim = function(){

    let name = "   function up    "
    name = name.trim()
    console.log(name)
}

const lowerCase = function(){

    let string = "rOhIt SHrivAstAVa"
    string = string.toLowerCase()
    console.log(string)
}

const upperCase = function(){

    let string = "rOhIt SHrivAstAVa"
    string = string.toUpperCase()
    console.log(string)
}

module.exports.trimName = trim
module.exports.changeToLowerCase = lowerCase
module.exports.changeToUpperCase = upperCase