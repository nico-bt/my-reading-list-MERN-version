import React, {useContext, useEffect, useState} from 'react'
import BookList from "./components/BookList/BookList";
import EmptyListMessage from './components/EmptyListMessage/EmptyListMessage';
import Form from './components/Form/Form';
import Navbar from "./components/Navbar/Navbar";
import { BookContext } from './context/BookContext';

function App() {
  // const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const {books, dispatch} = useContext(BookContext)

    // Fetch data
    useEffect(() => {
      const fetchBooks = async ()=>{
        try {
          const response = await fetch("/api/books")
          const data = await response.json()
          if(response.ok){
            // setBooks(data)
            dispatch({type:"SET_ALL_BOOKS", payload: data})
            setError(false)
            setIsLoading(false)
          }
        } catch (err) {
          setError(true)
          setIsLoading(false)
        }
      }
      fetchBooks()
    }, [dispatch])

  return (
    <div>
      <Navbar setShowForm={setShowForm}/>
      {books.length===0 && <EmptyListMessage error={error} isLoading={isLoading} />}
      <BookList books={books} />
      {showForm && <Form setShowForm={setShowForm} />}
    </div>
  );
}

export default App;
