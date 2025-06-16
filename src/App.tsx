import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

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
  //Variables used to fetch/search movies grid
  const [searchTerm, setSetsearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('')

  //Variables used to store Trending Movies
  const [trendingMoviesList, setTrendingMoviesList] = useState<Movie[]>([])
  const [isTrendingLoading, setIsTrendingLoading] = useState(false)
  const [trendingErrorMessage, setTrendingErrorMessage] = useState('')


  const fetchMovies = async (query = '') => {
    handleMoviesResponse([], true, '')
    try {
      console.log('Fetch Movies Called')
      const fetchMovieUrl = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(fetchMovieUrl, API_OPTIONS);
      if (!response.ok) {
        handleMoviesResponse([], false, 'Failed to fetch Movies')
      }
      const data: MovieResponse = await response.json()
      console.debug('Fetch Success', data)
      if (data.results.length) {
        handleMoviesResponse(data.results, false)
      } else {
        handleMoviesResponse([], false, 'Movie Not Found, Please check the name')
      }
    } catch (error) {
      console.error(`Error fetching Movies :: ${error}`);
      handleMoviesResponse([], false, 'Error fetching Movies. Please try again later.')
    }
  };

  const fetchTrendingMovies = async (time_period: string = 'day') => {
    try {
      console.debug(time_period);
      const trendingMoviesUrl = `${API_BASE_URL}/trending/movie/${time_period}?language=en-US`;
      const response = await fetch(trendingMoviesUrl, API_OPTIONS);
      if (!response.ok) {
        handleTrendingResponse([], false, 'Failed to fetch Movies')
      }
      const data: MovieResponse = await response.json()
      console.debug('Fetch Success Trending', data)
      if (data.results.length) {
        handleTrendingResponse(data.results, false)
      } else {
        handleTrendingResponse([], false, 'Movie Not Found, Please check the name')
      }
    } catch (error) {
      console.error(`Error fetching Trending Movies :: ${error}`);
      handleTrendingResponse([], false, 'Error fetching Movies. Please try again later.')
    }
  }

  const handleMoviesResponse = (arrayList: Movie[], loadingState: boolean, errorMessage: string = '') => {
    setIsLoading(loadingState);
    setMoviesList(arrayList)
    setErrorMessage(errorMessage)
  }

  const handleTrendingResponse = (arrayList: Movie[], loadingState: boolean, errorMessage: string = '') => {
    setIsTrendingLoading(loadingState);
    setTrendingMoviesList(arrayList);
    setTrendingErrorMessage(errorMessage)
  }

  useEffect(() => {
    fetchMovies(debounceSearchTerm)
    return () => { };
  }, [debounceSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies()

    return () => {

    }
  }, [])


  useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm])

  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You'll Enjoy
              without the Hassle
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSetsearchTerm} />
          </header>

          {trendingMoviesList.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>

              <ul>
                {
                  trendingMoviesList.map((movie, index) => (
                    <li key={movie.id}>
                      <p>{index + 1}</p>
                      <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} alt={movie.title} />
                    </li>
                  ))
                }
              </ul>
            </section>
          )}


          <section className="all-movies">
            <h2>All Movies</h2>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                errorMessage ? : (
                <p className="text-red-500">{errorMessage}</p>
                ) : (
                <ul>
                  {moviesList.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                  ))}
                </ul>
                )
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
