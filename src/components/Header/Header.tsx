import React from 'react'
import './Header.scss'
import Search from '../Search/Search'

interface HeaderProps {
    handleMovieSearch: (name: string) => void
}

const Header: React.FC<HeaderProps> = ({ handleMovieSearch }) => {
    return (
        <header className="header" id='header'>
            <h1>WatchQuest</h1>
            <Search handleMovieSearch={handleMovieSearch} />
        </header>
    )
}

export default Header