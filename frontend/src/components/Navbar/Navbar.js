import React from 'react'
import "./Navbar.css"

function Navbar({setShowForm}) {
  return (
    <div className="navbar">
        <h1>My Reading List</h1>
        <button className='navbar_button' onClick={()=>setShowForm(true)}>New book</button>
    </div> 
  )
}

export default Navbar