const axios = require('axios')
const { insertMany } = require('../Models/coinModel')
const coinModel = require('../Models/coinModel')

exports.getcryptocurrencycoins = async (req, res) => {
    try {
        let Header = req.headers["authorization"]
        if (!Header) return res.status(400).send({ status: false, msg: "Pls provide Authorization token in Header" })
        let getcoins = {
            method: "get",
            url: 'https://api.coincap.io/v2/assets',
            headers: {
                Authorization: Header
            }
        }
        let reslt = await axios(getcoins)
        let resltdata = reslt.data.data
        // let sortresltdata = resltdata.sort({changePercent24Hr : -1})
        resltdata.sort((a, b) => {
            return b.changePercent24Hr - a.changePercent24Hr;
        })
        let pqr = resltdata.slice(0, 100)
        // console.log(pqr)
        // let createcoins=[]
        // for(let i=0;i<100;i++){
        //  abc = await coinModel.create(pqr[i])
        //  createcoins.push(abc)
        // }
        let x = await coinModel.deleteMany()
        console.log(x)
        let createcoins = await coinModel.insertMany(pqr)
        res.send({ status: true, coins: createcoins })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}