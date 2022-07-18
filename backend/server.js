//Enviroment variables
require('dotenv').config()

// Express
const express = require("express")
const app = express()

//Database
const mongoose = require("mongoose")


app.get("/", (req, res)=>{
    res.json({msg: "Home Page"})
})

app.get("/books", (req, res)=>{
    res.json({msg: "GET All Books"})
})

//Connect to DB and run app
mongoose.connect(process.env.MONGODB_URI)
    .then(
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to DB & running on port: ${process.env.PORT}`)
        })
    )
    .catch(
        (err)=>console.log(err)
    )