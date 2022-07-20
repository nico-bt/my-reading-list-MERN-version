import React, { useContext } from 'react'
import { BookContext } from '../../context/BookContext'
import "./Book.css"

function Book({book}) {

    const {dispatch} = useContext(BookContext)

    const deleteBook = async ()=>{
        const response = await fetch("http://localhost:4000/api/books/" + book._id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        if(response.ok){
            dispatch({type: "DELETE_BOOK", payload: book._id})
        }
    }

    const handleClick = async() => {
        const response = await fetch("http://localhost:4000/api/books/" + book._id, {
            method: "PATCH",
            body: JSON.stringify({readComplete: !book.readComplete}),
            headers: {"Content-Type": "application/json"}
        })
        if(response.ok){
            const updatedBook = {...book, readComplete:!book.readComplete}
            dispatch({type:"TOOGLE_READ_STATUS", payload: updatedBook})
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
                    <p className='readMarker' onClick={handleClick}>
                        {book.readComplete? 
                            (<><span>Leido</span> <span className='material-symbols-outlined green'>check_box</span></>) 
                            : 
                            (<><span>Por leer</span> <span className="material-symbols-outlined red">menu_book</span></>)
                        } 
                    </p>
                            
                </div>
            </div>
            
            <div className="card-footer">
               {book.link? (<a href={book.link} target="_blank" rel="noreferrer"> Book Link</a>) : ("-") }
            </div>

        </div>
    )
}

export default Book