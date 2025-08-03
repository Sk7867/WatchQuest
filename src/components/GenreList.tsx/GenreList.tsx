import React, { useEffect, useState } from 'react'
import { environment } from '../../environment/environment'
import Slider from '../Slider/Slider'

interface GenreListProps {
  selectedGenre: number | null
  handleGenreSelected: (genreId: number) => void
}

const GenreList: React.FC<GenreListProps> = ({ selectedGenre, handleGenreSelected }) => {
  const [genreList, setgGenreList] = useState<genre[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchGenres();
    return () => { }
  }, [])

  const fetchGenres = async () => {
    const fetchGenreUrl = `${environment.tmdbBaseUrl}${environment.listGenre}`;
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const API_OPTIONS = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    const response = await fetch(fetchGenreUrl, API_OPTIONS);
    if (!response.ok) {
      handleGenreResponse([], false, 'Failed to fetch Genres');
      return;
    }
    const data: { genres: genre[] } = await response.json();
    if (data.genres.length) {
      handleGenreResponse(data.genres, false);
    } else {
      handleGenreResponse([], false, 'No Genres Found');
    }
  };

  const handleGenreResponse = (arrayList: genre[], loadingState: boolean, errorMessage: string = '') => {
    setgGenreList(arrayList);
    setIsLoading(loadingState);
    setErrorMessage(errorMessage);
  }

  const handleGenreClick = (genreId: number) => {
    handleGenreSelected(genreId)
  }

  return (
    <section className='genre-list-section my-20'>
      <h2 className="text-white text-2xl mb-4">Genres</h2>
      {isLoading ? (
        <ul className='genre-list flex flex-row gap-4 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <li key={index} className='w-24 h-12 border-1 p-3 border-white rounded-sm'>
              <div className='w-full h-full bg-gray-700 animate-pulse'></div>
            </li>
          ))}
        </ul>
      ) :
        errorMessage ? (<p className="text-red-500">{errorMessage}</p>) :
          (
            <>
              <Slider>
                {genreList.map((genre) => (
                  <li key={genre.id} onClick={() => handleGenreClick(genre.id)} className={`genre-item border-1  border-white cursor-pointer p-3 rounded-sm hover:bg-white hover:text-black transition-colors ${selectedGenre === genre.id ? 'bg-white text-black' : 'text-white'}`}>
                    <p className="genre-name text-nowrap">{genre.name}</p>
                  </li>
                ))}
              </Slider>
            </>
          )}
    </section>
  )
}

export default GenreList