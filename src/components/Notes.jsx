import listIcon from '../assets/images/list.svg'
import gridIcon from '../assets/images/grid.svg'
import { useState } from "react"
import NotesItem from "./NotesItem"
import clsx from 'clsx'
import { useTranslation } from "react-i18next"


const Notes = ({ notes}) => {
    
    const [view, setView] = useState(true)
    
    const {t} = useTranslation()
    
    let imgIcon = view ? listIcon : gridIcon
    let spanText = view ? 'Список' : 'Сетка'
    
    let notesListClass = clsx('notes__list', {'active': !view})
     
  return (
    <>
        <main className="main">
            <div className="container">
                <div className="notes__heading">
                    <h2 className="notes__heading-title">
                        {notes.length > 0 ? t('allNotes') : t('noNotes') }
                    </h2>
                    <button 
                        className="notes__heading-btn" 
                        onClick={() => setView(!view)}
                    >
                        <img src={imgIcon} alt="" />
                        <span>{spanText}</span>
                    </button>
                </div>
                <div className={notesListClass}>
                    {notes.map((note) => (
                        <NotesItem
                            key={note.id}
                            note={note}
                            view={view}
                        />
                    ))}
                </div>
            </div>
        </main>
    </>
  )
}

export default Notes