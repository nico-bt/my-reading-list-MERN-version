import React, {useContext, useState} from 'react'
import { BookContext } from '../../context/BookContext'
import "./EditForm.css"

function EditForm({bookToEdit, setShowEditForm}) {

    const [title, setTitle] = useState(bookToEdit.title)
    const [author, setAuthor] = useState(bookToEdit.author)
    const [link, setLink] = useState(bookToEdit.link? bookToEdit.link : "")
    const [submittedEmpty, setSubmittedEmpty] = useState(false)
    const {dispatch} = useContext(BookContext)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!title || !author){
            setSubmittedEmpty(true)
            return
        }
        try {
            const response = await fetch("http://localhost:4000/api/books/"+bookToEdit._id, {
                method: "PATCH",
                body: JSON.stringify({title, author, link}),
                headers: {"Content-Type": "application/json"}
            })
            if(response.ok){
                setTitle("")
                setAuthor("")
                setLink("")
                setSubmittedEmpty(false)
                setShowEditForm(false)
                
                const updatedBook = await response.json()
                dispatch({type:"EDIT_BOOK", payload: updatedBook})
            }
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div  className="form-container">
        <form className='form-control' onSubmit={handleSubmit}>
            <span className= "material-symbols-outlined close-btn" onClick={()=>setShowEditForm(false)}>disabled_by_default</span>
            <input 
                type="text"
                placeholder='Title' 
                value={title} 
                onChange={(e)=>{setTitle(e.target.value)}}
                className= {(submittedEmpty && !title)? "error":""}>
            </input>
            
            <input 
                type="text"
                placeholder='Author' 
                value={author} 
                onChange={(e)=>{setAuthor(e.target.value)}}
                className= {(submittedEmpty && !author)? "error":""}>
            </input>
            
            <input 
                type="text"
                placeholder='Optional link - https://amazon.com/your-book' 
                value={link} 
                onChange={(e)=>{setLink(e.target.value)}}>
            </input>

            <button type='submit' className='submit-btn'>Edit Book</button>
        </form>
    </div>
  )
}

export default EditForm