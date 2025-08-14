import React from 'react'
import './Header.scss'
import Search from '../Search/Search'
import { Link } from 'react-router-dom'

interface HeaderProps {
    handleMovieSearch: (name: string) => void
}

const Header: React.FC<HeaderProps> = ({ handleMovieSearch }) => {
    return (
        <header className="flex align-center justify-between bg-[#030014cc] m-0 sticky top-0 left-0 z-50 w-full backdrop:blur(10px) shadow-[0 2px 8px rgba(0, 0, 0, 0.08)]
        px-5 pb-12 xs:p-10 max-w-full mx-auto py-5 lg:py-[20px] lg:max-w-[90rem]" id='header'>
            {/* Hide H1 Element for mobile view */}
            <h1 className='hidden xl:block m-0'><Link to={"/"}>WatchQuest</Link></h1>
            <h1 className='block xl:hidden m-0'><Link to={"/"}>WQ</Link></h1>
            <Search handleMovieSearch={handleMovieSearch} />
        </header>
    )
}

export default Header