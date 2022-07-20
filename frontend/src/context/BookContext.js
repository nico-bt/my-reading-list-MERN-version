import React, { useReducer } from 'react'
import { createContext } from "react";

// Create a global state, available for all components/pages 
// and keep in sync the db with local data --> [books]

export const BookContext = createContext()

export const booksReducer = (state, action)=>{
    switch (action.type) {
        case "SET_ALL_BOOKS":
            return {
                books: action.payload
            }
        case "CREATE_BOOK":
            return {
                books: [action.payload, ...state.books]
            }    
        case "DELETE_BOOK":
            return {
                // get the id as payload and filter actual state
                books: state.books.filter(item => item._id !== action.payload)
            }
        case "EDIT_BOOK":
            return {
                // Update book object with payload if match id
                books: state.books.map(item => (item._id !== action.payload._id)? item : action.payload )
            }
        case "TOOGLE_READ_STATUS":
            return {
                // get the id as payload and toogle .teadComplete if match id
                books: state.books.map(item => (item._id !== action.payload._id)? item : action.payload )
            }
        default:
            return state
    }
}

export function BookContextProvider({children}) {
    const [state, dispatch] = useReducer( booksReducer, { books: [] } ) //useReducer(reducer, state)

  return (
    <BookContext.Provider value={{...state, dispatch}}>
        {children}
    </BookContext.Provider>
  )
}