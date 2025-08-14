import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use';

interface searchProps {
  handleMovieSearch: (name: string) => void
}

const Search: React.FC<searchProps> = ({ handleMovieSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchPlaceholder, setSearchPlaceholder] = useState('')

  // Debounce search term and update hook
  useDebounce(() => handleMovieSearch(searchTerm), 500, [searchTerm]);

  const handleSearchterm = (term: string) => {
    setSearchTerm(term)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    //call getPlaceholderText on browser resize
    getPlaceholderText();
    window.addEventListener('resize', () => {
      getPlaceholderText();
    });
    return () => {
      window.removeEventListener('resize', () => {
        getPlaceholderText();
      });
    }
  }, [])


  //Function that returns placeholder text based on browser innerwidth and handles browser resizing
  const getPlaceholderText = () => {
    if (window.innerWidth < 768) {
      setSearchPlaceholder('Search...');
    } else {
      setSearchPlaceholder('Search For Your Favorite Movie');
    }
  }



  return (
    <div className="search max-w-[200px] md:max-w-[500px] xl:max-w-3xl m-0" id='search_bar'>
      <div className='search_container position-relative'>
        <img src="./search.svg" alt="Search" />

        <input type="text"
          placeholder={searchPlaceholder}
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