import React from 'react'
import "./Book.css"

function Book({book}) {

    const deleteBook = async ()=>{
        const response = await fetch("http://localhost:4000/api/books/" + book._id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        if(response.ok){
            console.log(response)
        }
    }

  return (
        <div key={book._id} className="card">

            <div className="card-title">
                <span className="card-delete-btn material-symbols-outlined" onClick={deleteBook}>
                    delete
                </span>
                {book.title}
            </div>
            
            <div className="card-body">
                <p>{book.author}</p>
                <hr></hr>
                <p>{book.readComplete? "Leido" : "Falta leer"}</p>
            </div>
            
            <div className="card-footer">
                <a href={book.link} target="_blank"> {book.link? "Book Link":"Add link"}</a> 
            </div>

        </div>
    )
}

export default Book