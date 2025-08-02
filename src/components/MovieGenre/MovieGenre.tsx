import React from 'react'

interface IMovieGenreProps {
  genre: string;
}

const MovieGenre: React.FC<IMovieGenreProps> = ({ genre }) => {
  return (
    <>
      <li className={`genre-item border-1  border-white list-none p-3 rounded-sm hover:bg-white hover:text-black transition-colors`}>
        <p className="genre-name text-nowrap">{genre}</p>
      </li>
    </>
  )
}

export default MovieGenre