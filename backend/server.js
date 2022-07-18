//Enviroment variables
require('dotenv').config()

// Express
const express = require("express")
const app = express()

//Cors and json
var cors = require('cors')
app.use(cors())
app.use(express.json())

// Limiting number of request to the API
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

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