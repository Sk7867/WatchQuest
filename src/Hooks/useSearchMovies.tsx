import { useEffect, useState } from 'react'

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const useSearchMovies = () => {
    const [moviesList, setMoviesList] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchMovie, setSearchMovie] = useState('')

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");
        setMoviesList([]);
        try {
            const fetchMovieUrl = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(fetchMovieUrl, API_OPTIONS);
            if (!response.ok) {
                setErrorMessage('Failed to fetch Movies');
                setIsLoading(false);
                return;
            }
            const data: MovieResponse = await response.json();
            if (data.results.length) {
                setMoviesList(data.results);
            } else {
                setErrorMessage('Movie Not Found, Please check the name');
            }
        } catch (error) {
            setErrorMessage('Error fetching Movies. Please try again later.');
            console.error('Error fetching Movies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(searchMovie);
    }, [searchMovie]);

    return { moviesList, isLoading, errorMessage, setSearchMovie };
};

export default useSearchMovies;