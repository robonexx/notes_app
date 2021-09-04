import './App.scss';
import React, { useState, useReducer } from 'react'
import { v4 as uuid } from 'uuid'

const initialNotesState = {
  lastNoteCreated: null,
  totalNotes: 0,
    notes: [], 
}


const notesReducer = ( prevState, action ) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      }
      console.log('After ADD_NOTE: ', newState)
      return newState
   }
 }
}

function App() {
  const [noteInput, setNoteInput] = useState('')

  const [notesState, dispatch ] = useReducer(notesReducer, initialNotesState)

  const addNote = (e) => {
    e.preventDefault()
    
    if (!noteInput) {
      return
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() *20),
    }
    dispatch({ type: 'ADD_NOTE', payload: newNote })
  }

  const dropNote = (e) => {
    e.target.style.left = `${e.pageX - 50}px`
    e.target.style.top = `${e.pageY - 50}px`
  }

  const dragOver = e => {
    e.preventDefault()
    e.stopPropagation()

  }

  return (
    <div className="App" onDragOver={dragOver}>
      <h1>Your daily notes</h1>
      <form onSubmit={addNote} className="noteForm">
        <textarea name=""
          placeholder="New note..."
          value={noteInput}
        onChange={e => setNoteInput(e.target.value)}
        ></textarea>
        <button>Add</button>
      </form >
      {
        notesState
          .notes
          .map(note => (
            <div className="note"
              style={{ transform: `rotate(${note.rotate}deg)` }}
              draggable="true"
              onDragEnd={dropNote}
            key={note.id}>
              <pre className="text">{note.text}</pre>
            </div>
          ))
      }
    </div>
  );
}

export default App;
