const axios = require("axios")

const createMeme = async function (req, res) {
    try {
let abc = req.query
console.log(abc)
        let option = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${meme_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
            data: abc
        }
        let result = await axios(option)
        res.status(200).send({ data: result.data })
    }
    catch (err) {
        return res.status(500).send({ error: err })
    }
}

module.exports.createMeme = createMeme