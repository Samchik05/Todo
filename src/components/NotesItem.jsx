import delIcon from '../assets/images/del.svg'
import editIcon from '../assets/images/edit.svg'
import clsx from 'clsx'
import { useContext } from "react"
import { TodoContext } from "../context/todoContext"

const NotesItem = ({ note, view}) => {
    
    let notesItemInfoClass = clsx('notes__item-info', {'active': !view})
    let { deleteNoteHandler, editNoteHandler } = useContext(TodoContext)
    
  return (
    <div className="notes__item">
        <div className={notesItemInfoClass}>
            <h2 className="notes__item-title">{note.title}</h2>
            <div className="notes__item-date">{note.date}</div>
        </div>
        <p className="notes__item-text">{note.text}</p>
        <div className="notes__item-btns">
            <button className="notes__item-btn purple" onClick={() => editNoteHandler(note)}>
                <img src={editIcon} alt="" />
                <span>РЕДАКТИРОВАТЬ</span>
            </button>
            <button className="notes__item-btn red" onClick={() => deleteNoteHandler(note)}>
                <img src={delIcon} alt="" />
                <span>Удалить</span>
            </button>
        </div>
    </div>
  )
}

export default NotesItem