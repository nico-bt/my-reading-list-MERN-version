//Enviroment variables
require('dotenv').config()

// Express
const express = require("express")
const app = express()

//Cors and json
var cors = require('cors')
app.use(cors())
app.use(express.json())

//Database
const mongoose = require("mongoose")

//Routes
app.use("/api/books", require("./routes/books"))

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