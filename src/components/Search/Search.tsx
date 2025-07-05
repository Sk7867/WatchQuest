import React, { useState } from 'react'
import { useDebounce } from 'react-use';

interface searchProps {
  handleMovieSearch: (name: string) => void
}

const Search: React.FC<searchProps> = ({ handleMovieSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce search term and update hook
  useDebounce(() => handleMovieSearch(searchTerm), 500, [searchTerm]);

  const handleSearchterm = (term: string) => {
    setSearchTerm(term)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  return (
    <div className="search">
      <div className='search_container position-relative'>
        <img src="./search.svg" alt="Search" />

        <input type="text"
          placeholder='Search For Your Favorite Movie'
          value={searchTerm}
          onChange={(e) => handleSearchterm(e.target.value)}
        />
        {searchTerm && (
          <span className='position-absolute text-white size-7 flex items-center justify-center white w-[24px] h-[24px]' style={{ right: '10px', top: '50%', cursor: 'pointer' }} onClick={handleClearSearch}>
            &#x2715;
          </span>
        )}
      </div>
    </div>
  )
}

export default Search