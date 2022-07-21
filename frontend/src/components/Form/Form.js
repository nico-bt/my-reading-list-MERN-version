import React, {useContext, useState} from 'react'
import { BookContext } from '../../context/BookContext'
import "./Form.css"

function Form({setShowForm}) {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [link, setLink] = useState("")
    const [submittedEmpty, setSubmittedEmpty] = useState(false)
    const {dispatch} = useContext(BookContext)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!title || !author){
            setSubmittedEmpty(true)
            return
        }
        try {
            const response = await fetch("/api/books", {
                method: "POST",
                body: JSON.stringify({title, author, link}),
                headers: {"Content-Type": "application/json"}
            })
            if(response.ok){
                setTitle("")
                setAuthor("")
                setLink("")
                setSubmittedEmpty(false)
                setShowForm(false)
                
                const newBook = await response.json()
                dispatch({type:"CREATE_BOOK", payload: newBook})
            }
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div  className="form-container">
        <form className='form-control' onSubmit={handleSubmit}>
            <span className= "material-symbols-outlined close-btn" onClick={()=>setShowForm(false)}>disabled_by_default</span>
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

            <button type='submit' className='submit-btn'>Add Book</button>
        </form>
    </div>
  )
}

export default Form