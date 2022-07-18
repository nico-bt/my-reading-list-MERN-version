const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title:{
        type: String, 
        required: true
    },
    author:{
        type: String, 
        required: true
    },
    link:{
        type: String, 
    },
    readComplete:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Book", bookSchema)