import React from 'react'

interface searchProps {
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Search = (props: searchProps) => {
  const { searchTerm, setSearchTerm } = props

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