const express = require('express')
const router = express.Router()
const {getcryptocurrencycoins}=require('../controller/coin')

router.get("/test-me",function(req,res){
    res.send("Hi there, I am Test-Me")
})

router.get("/assets",getcryptocurrencycoins)

module.exports = router