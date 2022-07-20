import React, { useContext } from 'react'
import { BookContext } from '../../context/BookContext'
import "./Book.css"

function Book({book}) {

    const {books, dispatch} = useContext(BookContext)

    const deleteBook = async ()=>{
        const response = await fetch("http://localhost:4000/api/books/" + book._id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        if(response.ok){
            dispatch({type: "DELETE_BOOK", payload: book._id})
        }
    }

  return (
        <div key={book._id} className="card">
            <div className='space-between'>
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
            </div>
            
            <div className="card-footer">
               {book.link? (<a href={book.link} target="_blank" rel="noreferrer"> Book Link</a>) : ("-") }
            </div>

        </div>
    )
}

export default Book