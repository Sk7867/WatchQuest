import React from 'react'
import './Header.scss'
import Search from '../Search/Search'

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="header" id='header'>
            <h1>WatchQuest</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
    )
}

export default Header