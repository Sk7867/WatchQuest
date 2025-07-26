import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { environment } from '../environment/environment';
import Spinner from '../components/Spinner';
import MoviePosterImage from '../components/MoviePosterImage/MoviePosterImage';
import MovieDetailsComponent from '../components/MovieDetailsComponent/MovieDetailsComponent';
import { fetchMovieDetailsService } from '../Service/movieService';

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
  const [movieCredits, setMovieCredits] = useState<IMovieCredits>({})

  useEffect(() => {
    // Fetch movie details using the name parameter
    if (id) {
      handleMovieDetailsResponse(null, true, '')
      fetchMovieDetails(id);
      fetchMovieCredits(id);
    }
    // Cleanup if necessary
    return () => {
      // Any cleanup logic if needed
    };


  }, [id]);

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const movieDetailsObj = await fetchMovieDetailsService(movieId);
      console.log('Movie Details:', movieDetailsObj);
      handleMovieDetailsResponse(movieDetailsObj, false, '')
    } catch (error) {
      console.error('Fetch Movie Details Error ::', error)
      handleMovieDetailsResponse(null, false, 'Movie details not found.');
    }
  }

  //Write a helper function to filter object with job "Director" and return an array of names using IMovieCreditsResponse as refecnce
  const filterDirectors = (crew: Crew[]) => {
    return crew.filter(member => member.job === 'Director').map(director => director.name);
  }

  //write a helper function to filter object with job "Writer" and return an array of names using IMovieCreditsResponse as reference
  const filterWriters = (crew: Crew[]) => {
    return crew.filter(member => member.job === 'Writer').map(writer => writer.name);
  }

  //writer a helper function which returns an array of names from cast using IMovieCreditsResponse as reference
  const filterCast = (cast: Cast[]) => {
    return cast.map(member => member.name);
  }

  const fetchMovieCredits = async (movieId: string) => {
    try {
      const getCreditsUrl = environment.tmdbBaseUrl + environment.movieDetails + movieId + "/credits";
      const creditsResponse = await fetch(getCreditsUrl, API_OPTIONS);
      if (!creditsResponse.ok) {
        console.error('Failed to fetch movie credits');
        return;
      }
      const creditsData: IMovieCreditsResponse = await creditsResponse.json();
      const directors = filterDirectors(creditsData.crew);
      const writers = filterWriters(creditsData.crew);
      const cast = filterCast(creditsData.cast);

      setMovieCredits({ directors, writers, cast });
      // Process credits data if needed
      console.log('Movie directros:', directors);
    } catch (error) {
      console.error('Fetch Movie Credits Error ::', error);
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
        <div className="max-w-4xl md:gap-6 text-white shadow-lg flex flex-col md:flex-row">
          {/* Poster */}
          <MoviePosterImage altText={movieDetails.title} posterPath={movieDetails.poster_path} />
          {/* Details */}
          <MovieDetailsComponent movieTitle={movieDetails.title} movieDescription={movieDetails.overview} movieCredits={movieCredits} />
        </div>
      )}
    </div>
  )
}

export default MovieDetailsPage