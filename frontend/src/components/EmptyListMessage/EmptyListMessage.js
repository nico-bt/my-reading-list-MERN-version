import React from 'react'
import "./EmptyListMessage.css"

function EmptyListMessage() {
  return (
    <div className='empty-list'>
        <div>
            <p>Your list is empty.</p>
            <p>Add a new book to read.</p>
        </div>
    </div>
  )
}

export default EmptyListMessage