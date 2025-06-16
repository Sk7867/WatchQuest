import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header/Header";
import useSearchMovies from "./Hooks/useSearchMovies";
import { useDebounce } from 'react-use';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const { moviesList, isLoading, errorMessage, setSearchMovie } = useSearchMovies();

  // Debounce search term and update hook
  useDebounce(() => setSearchMovie(searchTerm), 500, [searchTerm]);

  //Variables used to store Trending Movies
  const [trendingMoviesList, setTrendingMoviesList] = useState<Movie[]>([])
  const [isTrendingLoading, setIsTrendingLoading] = useState(false)
  const [trendingErrorMessage, setTrendingErrorMessage] = useState('')

  const fetchTrendingMovies = async (time_period: string = 'day') => {
    try {
      const trendingMoviesUrl = `${API_BASE_URL}/trending/movie/${time_period}?language=en-US`;
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

  useEffect(() => {
    fetchTrendingMovies()
    return () => { }
  }, [])

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        <div className="pattern">
          <div className="wrapper">
            {trendingMoviesList.length > 0 && (
              <section className="trending">
                <h2>Trending Movies</h2>
                <ul>
                  {trendingMoviesList.map((movie, index) => (
                    <li key={movie.id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section className="all-movies">
              <h2>All Movies</h2>
              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <p className="text-red-500">{errorMessage}</p>
              ) : (
                <ul>
                  {moviesList.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
