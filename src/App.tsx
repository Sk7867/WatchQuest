import { useState } from "react";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header/Header";
import useSearchMovies from "./Hooks/useSearchMovies";
import { useDebounce } from 'react-use';
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";
import GenreList from "./components/GenreList.tsx/GenreList";



const App = () => {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const { moviesList, isLoading, errorMessage, setSearchMovie } = useSearchMovies();

  // Debounce search term and update hook
  useDebounce(() => setSearchMovie(searchTerm), 500, [searchTerm]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        <div className="pattern">
          <div className="wrapper">
            <TrendingMovies />
            <GenreList />
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
