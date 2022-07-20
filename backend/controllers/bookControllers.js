const mongoose = require("mongoose")
const Book = require("../models/BookModel")

// GET ALL books
const getAllBooks = async (req, res)=>{
    try {
        const books = await Book.find({}).sort({readComplete:1, createdAt: -1})
        res.status(200).json(books)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// CREATE New book
const createNewBook = async (req, res)=>{
    const {title, author, link} = req.body
    
    // Pass to the frontend wich fields are empty -- "title" and "author" are required 
    const emptyFields=[]
    if(!title){emptyFields.push("title")}
    if(!author){emptyFields.push("author")}
    // don't try to create an item in db untill all fields are filled
    if(emptyFields.length>0){
        return res.status(400).json({error: "Please enter title and author", emptyFields})
    }

    try {
        const book = await Book.create({title, author, link})
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// GET SINGLE book
const getSingleBook = async (req, res)=>{
    // Check if the passed id is a valid mongoDb type
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({error: "No such book in db"}) 
    }

    try {
        const book = await Book.findById(req.params.id)
        if(!book){
            return res.status(400).json({error: "No such book in db"})
        }
        res.status(200).json(book)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// DELETE a book
const deleteBook = async (req, res)=>{    
    // Check if the passed id is a valid mongoDb type
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({error: "No such book in db"}) 
    }

    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id)
        if(!deletedBook){
            return res.status(400).json({error: "No such workout in db"})
        }
        res.status(200).json(deletedBook)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//UPDATE a book
const updateBook = async(req, res)=>{
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        res.status(200).json(updatedBook)
    } catch (error) {
        res.status(400).json(error.message)
    }
}


module.exports = {getAllBooks, createNewBook, getSingleBook, deleteBook, updateBook}