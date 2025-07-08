import React from 'react'
import './Header.scss'
import Search from '../Search/Search'
import { Link } from 'react-router-dom'

interface HeaderProps {
    handleMovieSearch: (name: string) => void
}

const Header: React.FC<HeaderProps> = ({ handleMovieSearch }) => {
    return (
        <header className="header" id='header'>
            <h1><Link to={"/"}>WatchQuest</Link></h1>
            <Search handleMovieSearch={handleMovieSearch} />
        </header>
    )
}

export default Header