import React, {useEffect, useState} from 'react'
import BookList from "./components/BookList/BookList";
import Form from './components/Form/Form';
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)

    // Fetch data
    useEffect(() => {
        const fetchBooks = async ()=>{
            const response = await fetch("http://localhost:4000/api/books")
            const data = await response.json()
            if(response.ok){
                setBooks(data)
            }
        }
        fetchBooks()
    }, [])

  return (
    <div>
      <Navbar setShowForm={setShowForm}/>
      <BookList books={books} />
      {showForm && <Form setShowForm={setShowForm} />}
    </div>
  );
}

export default App;
