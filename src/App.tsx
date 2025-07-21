import { lazy, useState } from "react";
import Header from "./components/Header/Header";
import useSearchMovies from "./Hooks/useSearchMovies";
import Homepage from "./Pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import FooterNote from "./components/FooterNote/FooterNote";



const App = () => {
  const [searchMovie, setSearchMovie] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const { moviesList, isLoading, errorMessage } = useSearchMovies(searchMovie, selectedGenre);


  const handleGenreSelected = (genreId: number) => {
    setSelectedGenre(genreId)
  }

  const handleMovieSearch = (name: string) => {
    setSearchMovie(name)
    setSelectedGenre(null);
  }

  const MovieDetailPageLazy = lazy(() => import('./Pages/MovieDetailsPage'));

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header handleMovieSearch={handleMovieSearch} />
        <main>
          <div className="pattern">
            <div className="wrapper pt-0">
              <Routes>
                <Route path="/" element={
                  <Homepage errorMessage={errorMessage} isLoading={isLoading} moviesList={moviesList} selectedGenre={selectedGenre} handleGenreSelected={handleGenreSelected} />
                } />
                <Route path="/movie/:id" element={
                  <MovieDetailPageLazy />
                } />
              </Routes>

            </div>
          </div>
        </main>
      </BrowserRouter>
      <FooterNote />
    </>
  );
};

export default App;
