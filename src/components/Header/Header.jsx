import React from 'react'

import './style.css';
const Header = ({search, setSearch}) => {
    
  return (
    <header className='header'>
        <form >
            <input 
                type="text" 
                className="input"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search for a country..." 
                />
        </form>
    </header>
  )
}

export default Header