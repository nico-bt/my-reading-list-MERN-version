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


//Try to get data from database with the Book model
const Book = require("./models/BookModel")

app.get("/books", async (req, res)=>{
    try {
        const books = await Book.find({})
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

//Try to create data object with the Book model and save in database
app.get("/books/new", async (req, res)=>{
    const newBook = {
        title: "Rayuela", 
        author: "Julio Cortazar", 
        link: "https://www.amazon.com/-/es/gp/product/B01FV29V6U/"
    }
    try {
        const book = await Book.create(newBook)
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json(error.message)
    }
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