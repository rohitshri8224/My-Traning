const axios = require("axios")

const getWeather = async function (req, res) {

    try {
        let citiesArr = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        objectArr = []
        for (i = 0; i < citiesArr.length; i++) {
            let obj = { city: citiesArr[i] }


            let option = {
                method: 'get',
                url: `http://api.openweathermap.org/data/2.5/weather?q=${citiesArr[i]}&appid=f76d805a1949f19946140fd43ee7a2bb`
            }
            let result = await axios(option)

            obj.temp = result.data.main.temp

            objectArr.push(obj)
            console.log(objectArr)

        }
        let sortedArr = objectArr.sort(function (a, b) { return a.temp - b.temp })
        return res.status(200).send({ msg: sortedArr })
    } catch (err) {
        return res.status(500).send({ msg: "server issue", error: err })
    }



}


module.exports.getWeather = getWeather