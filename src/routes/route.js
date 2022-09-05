const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const MemeController = require("../controllers/memeController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/getWeather",WeatherController.getWeather)
router.post("/createMeme",MemeController.createMeme)










// router.get("/cowin/states", CowinController.getStates)

// router.get("/cowin/getByPin", CowinController.getByPin)

// router.post("/cowin/getOtp", CowinController.getOtp)



module.exports = router;