import React, {useEffect, useState} from 'react'
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";

function App() {
  const [books, setBooks] = useState([])

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
      <Navbar />
      <BookList books={books} />
    </div>
  );
}

export default App;
