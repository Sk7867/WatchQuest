import { useState } from "react";
import Header from "./components/Header/Header";
import useSearchMovies from "./Hooks/useSearchMovies";
import { useDebounce } from 'react-use';
import Homepage from "./Pages/Homepage";



const App = () => {
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const { moviesList, isLoading, errorMessage, setSearchMovie } = useSearchMovies();

  // Debounce search term and update hook
  useDebounce(() => setSearchMovie(searchTerm), 500, [searchTerm]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Homepage errorMessage={errorMessage} isLoading={isLoading} moviesList={moviesList} />
    </>
  );
};

export default App;
