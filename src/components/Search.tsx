import React from 'react'

interface searchProps {
  searchTerm: string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Search = (props: searchProps) => {
  const { searchTerm, setSearchTerm } = props

  const handleSearchterm = (term: string) => {
    console.debug('search ::', term)
    setSearchTerm(term)
  }

  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search" />

        <input type="text"
          placeholder='Search For Your Favorite Movie'
          value={searchTerm}
          onChange={(e) => handleSearchterm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search