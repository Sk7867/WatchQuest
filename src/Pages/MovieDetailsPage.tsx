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
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null)
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

  const handleMovieDetailsResponse = (details: IMovieDetails | null, loadingState: boolean, errorMessage: string = '') => {
    setMovieDetails(details);
    setIsLoading(loadingState);
    setErrorMessage(errorMessage);
  }

  return (
    <>
      <div className='flex justify-center items-center'>
        {
          isLoading ? <Spinner /> :
            <>
              {
                errorMessage ? <p className='text-red-500 text-2xl'>{errorMessage}</p> :
                  <>
                    <div>
                      <h1>Movie Name : {movieDetails?.title}</h1>
                    </div>
                  </>
              }
            </>
        }
      </div>
    </>
  )
}

export default MovieDetailsPage