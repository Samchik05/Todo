import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Notes from "./components/Notes"
import editIcon from './assets/images/edit.svg'
import Modal from "./components/Modal"
import { TodoContext } from "./context/todoContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  
  const setLS = () => localStorage.notes = JSON.stringify(notes)
  const getLS = () => localStorage.notes ? JSON.parse(localStorage.notes) : []
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notes, setNotes] = useState(getLS)
  const [isEdit, setIsEdit] = useState(false)
  const [editedNote, setEditedNote] = useState(null)
  const [search, setSearch] = useState('')
  
  
  const filteredNotes = notes.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()) )
  
  
  useEffect(() => {
    setLS()
  }, [notes])
  
  
  const openModal = () => {
    setIsModalOpen(true)
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
    setIsEdit(false)
    setEditedNote(null)
  }
  
  const addNoteHandler = (note) => {
    if(editedNote?.id) {
      const updatedNotes = notes.map((item) => {
        if(item.id == note.id) {
          return note
        }
        return item
      })
      setNotes(updatedNotes)
    }else {
      setNotes([...notes, note])
      toast.success('Заметка успешна добавлена', {
        position: 'top-right',
        autoClose: 2000
      })
    }
    closeModal()
   
  }
  
  const deleteNoteHandler = (note) => {
      setNotes(notes.filter((item) => item.id != note.id))
      toast.error('Заметка успешна удалена', {
        position: 'top-right',
        autoClose: 2000
      })
  }
  
  const editNoteHandler = (note) => {
    setEditedNote(note)
    setIsEdit(true)
    setIsModalOpen(true)
  }
  
  
  return (
    <>
      <TodoContext.Provider value={{
        deleteNoteHandler,
        addNoteHandler,
        closeModal,
        editNoteHandler
      }}>
        <div className="wrapper">
          <Navbar search={search} setSearch={setSearch}/>
          <Notes
            notes={filteredNotes}
          />
          { isModalOpen &&  <Modal editedNote={editedNote} isEdit={isEdit}/> }
          { !isModalOpen && 
            <button className="add__note" onClick={() => openModal()}>
              <img src={editIcon} alt="" />
            </button>
          }
          <ToastContainer />
        </div>
      </TodoContext.Provider>
    </>
  )
}

export default App


