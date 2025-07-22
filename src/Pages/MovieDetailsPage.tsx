import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { environment } from '../environment/environment';
import Spinner from '../components/Spinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<IMovieDetailsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // Fetch movie details using the name parameter
    if (id) {
      handleMovieDetailsResponse(null, true, '')
      fetchMovieDetails(id);
    }
    // Cleanup if necessary
    return () => {
      // Any cleanup logic if needed
    };


  }, [id]);

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const getMovieUrl = environment.tmdbBaseUrl + environment.movieDetails + movieId;
      const movieResponse = await fetch(getMovieUrl, API_OPTIONS)
      if (!movieResponse.ok) {
        console.error('Failed to fetch movie details');
        return;
      }
      const movieDetailsObj: IMovieDetailsResponse = await movieResponse.json();
      //Check if movieDetailsObj is not empty
      if (!movieDetailsObj || Object.keys(movieDetailsObj).length === 0) {
        handleMovieDetailsResponse(null, false, 'Movie details not found.');
        return;
      }
      console.log('Movie Details:', movieDetailsObj);
      handleMovieDetailsResponse(movieDetailsObj, false, '')
    } catch (error) {
      console.error('Fetch Movie Details Error ::', error)
      handleMovieDetailsResponse(null, false, 'Movie details not found.');
    }
  }

  const handleMovieDetailsResponse = (details: IMovieDetailsResponse | null, loadingState: boolean, errorMessage: string = '') => {
    setMovieDetails(details);
    setIsLoading(loadingState);
    setErrorMessage(errorMessage);
  }

  // Helper functions for formatting
  const getGenres = (genres?: { name: string }[]) => genres?.map(g => g.name).join(', ') || '-';
  const getCreators = (creators?: { name: string }[]) => creators?.map(c => c.name).join(', ') || '-';
  const getStars = (stars?: { name: string }[]) => stars?.map(s => s.name).join(', ') || '-';
  const getYear = (date?: string) => date ? new Date(date).getFullYear() : '';
  const getRuntime = (runtime?: number) => runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : '';

  return (
    <div className="flex flex-col md:flex-row mt-8 gap-8 text-white">
      {isLoading ? (
        <div className="w-full flex justify-center items-center min-h-[400px]"><Spinner /></div>
      ) : errorMessage ? (
        <div className="w-full flex justify-center items-center min-h-[400px]">
          <p className='text-red-500 text-2xl'>{errorMessage}</p>
        </div>
      ) : movieDetails && (
        <>
          {/* Poster */}
          <div className="flex-shrink-0 w-full md:w-[220px]">
            <img
              src={movieDetails.poster_path ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` : '/no-movie.png'}
              alt={movieDetails.title}
              className="rounded-lg w-full h-auto object-cover shadow-md"
            />
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-3xl font-bold leading-tight">{movieDetails.title}</h1>
              <span className="text-gray-400 text-base font-medium">{movieDetails.certification || 'TV-14'}</span>
              <span className="text-gray-400 text-base font-medium">{getRuntime(movieDetails.runtime)}</span>
              <span className="text-gray-400 text-base font-medium">{getGenres(movieDetails.genres)}</span>
              <span className="text-gray-400 text-base font-medium">{movieDetails.media_type === 'tv' ? 'TV Series' : 'Movie'}{getYear(movieDetails.release_date)}</span>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-pink-400 text-2xl">{'★'.repeat(Math.round((movieDetails.vote_average || 0) / 2))}</span>
              <span className="text-pink-400 text-lg font-bold">{movieDetails.vote_average?.toFixed(1) || '-'}</span>
              <span className="text-gray-400 text-base">/ 10</span>
            </div>
            {/* Overview */}
            <p className="mt-4 text-gray-200 text-base max-w-2xl">
              {movieDetails.overview}
            </p>
            {/* Creators */}
            <div className="mt-4">
              <span className="text-gray-400 font-semibold">CREATORS</span><br />
              <span className="text-pink-400 font-medium">{getCreators(movieDetails.creators)}</span>
            </div>
            {/* Stars */}
            <div className="mt-2">
              <span className="text-gray-400 font-semibold">STARS</span><br />
              <span className="text-pink-400 font-medium">{getStars(movieDetails.stars)}</span>
              <span className="text-blue-400 font-semibold ml-2 cursor-pointer">SEE ALL &gt;</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieDetailsPage