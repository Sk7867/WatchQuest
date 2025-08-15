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
    <div className="search max-w-[200px] md:max-w-[500px] xl:max-w-3xl m-0 h-min" id='search_bar'>
      <div className='search_container  position-relative'>
        {/* <img src="./search.svg" alt="Search" /> */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label='Search Icon'>
          <path fillRule="evenodd" clipRule="evenodd" d="M1.875 8.125C1.875 4.67322 4.67322 1.875 8.125 1.875C11.5768 1.875 14.375 4.67322 14.375 8.125C14.375 11.5768 11.5768 14.375 8.125 14.375C4.67322 14.375 1.875 11.5768 1.875 8.125ZM8.125 0C3.63769 0 0 3.63769 0 8.125C0 12.6124 3.63769 16.25 8.125 16.25C10.0309 16.25 11.7835 15.5938 13.1691 14.495L17.4621 18.7879L18.125 19.4509L19.4509 18.125L18.7879 17.4621L14.495 13.1691C15.5938 11.7835 16.25 10.0309 16.25 8.125C16.25 3.63769 12.6124 0 8.125 0Z" fill="#AB8BFF" />
        </svg>


        <input type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => handleSearchterm(e.target.value)}
          className=''
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