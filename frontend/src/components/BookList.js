import "./BookList.css"

function BookList({books}) {
  return (
    <div className='container'>
        {books.map(book => (
            <div key={book._id} className="book">
                <h1>{book.title}</h1>
                <h2>{book.author}</h2>
            </div>
        ))}
    </div>
  )
}

export default BookList