const express = require('express')
const route = require('./Routes/route')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://harsh258:Wb5QwC0mG0iUBIXS@new-cluster.baoq1vx.mongodb.net/ProjectAssignment-DB",{useNewUrlParser:true})
.then(()=>console.log("MongoDB is connected"))
.catch(err=>console.log(err))

app.use('/',route)

app.listen(3000,()=>console.log("Express app is running on port 3000"))