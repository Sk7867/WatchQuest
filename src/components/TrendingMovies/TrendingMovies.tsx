import { useEffect, useState } from 'react'
import { environment } from '../../environment/environment';
import { Link } from 'react-router-dom';
import Slider from '../Slider/Slider';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const TrendingMovies = () => {

  //Variables used to store Trending Movies
  const [trendingMoviesList, setTrendingMoviesList] = useState<Movie[]>([])
  const [isTrendingLoading, setIsTrendingLoading] = useState(false)
  const [trendingErrorMessage, setTrendingErrorMessage] = useState('')





  useEffect(() => {
    fetchTrendingMovies()
    return () => { }
  }, [])


  const fetchTrendingMovies = async (time_period: string = 'day') => {
    setIsTrendingLoading(true);
    setTrendingErrorMessage('')
    setTrendingMoviesList([])
    try {
      const trendingMoviesUrl = `${environment.tmdbBaseUrl}${environment.trending}${time_period}?language=en-US`;
      const response = await fetch(trendingMoviesUrl, API_OPTIONS);
      if (!response.ok) {
        handleTrendingResponse([], false, 'Failed to fetch Movies')
      }
      const data: MovieResponse = await response.json()
      if (data.results.length) {
        handleTrendingResponse(data.results, false)
      } else {
        handleTrendingResponse([], false, 'Movie Not Found, Please check the name')
      }
    } catch (error) {
      handleTrendingResponse([], false, 'Error fetching Movies. Please try again later.');
      console.error('Error fetching Movies:', error);
    }
  }

  const handleTrendingResponse = (arrayList: Movie[], loadingState: boolean, errorMessage: string = '') => {
    setTrendingMoviesList(arrayList);
    setIsTrendingLoading(loadingState);
    setTrendingErrorMessage(errorMessage)
  }

  return (
    <section className="trending h-[300px]">
      <h2 className='mb-10'>Trending Movies</h2>
      {isTrendingLoading ? (
        //Display skeleton component of 5 trending movies while loading
        <ul className='mt-20'>
          <div>Test</div>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <div className="w-6 h-6 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="w-[127px] h-[163px] bg-gray-700 rounded-lg animate-pulse"></div>
            </li>
          ))}
        </ul>
      ) :
        trendingErrorMessage ? (<p className='text-red-500'>{trendingErrorMessage}</p>) : (
          <Slider>
            {trendingMoviesList.map((movie, index) => (
              <li key={movie.id} className='h-[165px]'>
                <Link to={`/movie/${movie.id}`} className='flex items-center h-[165px]'>
                  <p>{index + 1}</p>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'}
                    alt={movie.title}
                    loading="eager"
                    fetchPriority="high"
                  />
                </Link>
              </li>
            ))}
          </Slider>
        )
      }

    </section>
  )
}

export default TrendingMovies