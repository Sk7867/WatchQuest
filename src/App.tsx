import { useState } from "react";
import Header from "./components/Header/Header";
import useSearchMovies from "./Hooks/useSearchMovies";
import Homepage from "./Pages/Homepage";



const App = () => {
  const [searchMovie, setSearchMovie] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const { moviesList, isLoading, errorMessage } = useSearchMovies(searchMovie, selectedGenre);


  const handleGenreSelected = (genreId: number) => {
    setSelectedGenre(genreId)
  }

  const handleMovieSearch = (name: string) => {
    setSearchMovie(name)
  }

  return (
    <>
      <Header handleMovieSearch={handleMovieSearch} />
      <Homepage errorMessage={errorMessage} isLoading={isLoading} moviesList={moviesList} handleGenreSelected={handleGenreSelected} />
    </>
  );
};

export default App;
