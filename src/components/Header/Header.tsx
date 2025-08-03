import React from 'react'
import './Header.scss'
import Search from '../Search/Search'
import { Link } from 'react-router-dom'

interface HeaderProps {
    handleMovieSearch: (name: string) => void
}

const Header: React.FC<HeaderProps> = ({ handleMovieSearch }) => {
    return (
        <header className="header px-3 py-5 xl:px-[17rem] lg:py-[20px]" id='header'>
            {/* Hide H1 Element for mobile view */}
            <h1 className='hidden xl:block'><Link to={"/"}>WatchQuest</Link></h1>
            <h1 className='block xl:hidden'><Link to={"/"}>WQ</Link></h1>
            <Search handleMovieSearch={handleMovieSearch} />
        </header>
    )
}

export default Header