import { useContext, useState } from "react"
import { v4 } from "uuid"
import { TodoContext } from "../context/todoContext"




const Modal = ({ isEdit, editedNote }) => {
    
    
    
    
    const [title, setTitle] = useState(editedNote?.title ?? '')
    const [text, setText] = useState(editedNote?.text ?? '')
    const [error, setError] = useState(false)
    let { addNoteHandler, closeModal: close } = useContext(TodoContext)
    
    const addOrChange = () => {
        if(text.length > 2 && title.length > 2) {
            const note = {
                id: editedNote?.id ?? v4(),
                title: title,
                text: text,
                date: new Date().toLocaleDateString()
            }
            addNoteHandler(note)
        }else {
            setError(true)
        }
       
    }
    
  return (
  <div className="modal" onClick={() => close()}>
    <div className="modal__block" onClick={(event) => event.stopPropagation()}>
        <h2 className="modal__block-title">
            {isEdit ? 'Изменить заметку' : 'Добавить заметку'}
        </h2>
        <div className="modal__block-fields">
            <label>
                <input 
                    type="text" 
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <span>Title</span>
            </label>
            <label>
                <input 
                    type="text" 
                    placeholder="Text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <span>Text</span>
            </label>
        </div>
        {error && <h2 className="modal__block-error">
            Вы должны в каждое  поле вести минимум 3 символа    
        </h2>}
        <div className="modal__block-btns">
            <button onClick={close} className="modal__block-btn red">Отмена</button>
            <button onClick={addOrChange} className="modal__block-btn purple">
                {isEdit ? 'Изменить' : 'Добавить'}
            </button>
        </div>
    </div>
  </div>
  )
}

export default Modal