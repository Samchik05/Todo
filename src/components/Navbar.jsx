import React, { useState } from 'react'
import searchIcon from '../assets/images/search.svg'
import backIcon from '../assets/images/back.svg'
import closeIcon from '../assets/images/close.svg'
import { useTranslation } from "react-i18next"

const Navbar = ({ search, setSearch }) => {
  
  const [nav, setNav] = useState(true)
  const [language, setLanguage] = useState('ru')
  
  const { i18n, t } = useTranslation()
  
  const change = () => {
    const currentLanguage = language == 'ru' ? 'uz' : 'ru'
    setLanguage(currentLanguage)
    i18n.changeLanguage(currentLanguage)
  }
  
  const reset = () => {
    setNav(true)
    setSearch('')
  }
  
  return (
    <>
        <header className="header">
            {nav ? (
              <nav className="header__nav">
                <button 
                  className="header__nav-lang"
                  onClick={() => change()}
                >
                  {language == 'ru' ? 'ru' : 'uz'}
                </button>
                <h1 className="header__nav-title">
                  {t('title')}
                </h1>
                <img 
                  src={searchIcon} 
                  alt="" 
                  className="header__nav-search" 
                  onClick={() => setNav(false)}
                />
              </nav>
            ) : (
              <nav className="header__nav">
                <img src={backIcon} alt=""  onClick={() => reset()} />
                <input 
                  type="text" 
                  placeholder="Поиск..." 
                  className="header__nav-input"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <img src={closeIcon} alt="" onClick={() => setSearch('')}/>
              </nav>
            )}
           
            
        </header>
    </>
  )
}

export default Navbar