import { useEffect, useState } from 'react'
import { environment } from '../environment/environment';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
};

const useSearchMovies = (searchMovie: string, genreId: null | number) => {
	const [moviesList, setMoviesList] = useState<Movie[]>([])
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (genreId) {
			fetchMoviesBasedOnGenre(genreId)
		} else {
			fetchMovies(searchMovie)
		}
		return () => { }
	}, [searchMovie, genreId])


	const fetchMovies = async (query = '') => {
		setIsLoading(true);
		setErrorMessage("");
		setMoviesList([]);
		try {
			const fetchMovieUrl = query
				? `${environment.tmdbBaseUrl}${environment.search}${encodeURIComponent(query)}`
				: `${environment.tmdbBaseUrl}${environment.discover}`;
			const response = await fetch(fetchMovieUrl, API_OPTIONS);
			if (!response.ok) {
				handleMoviesResponse([], false, 'Failed to fetch Movies')
				return;
			}
			const data: MovieResponse = await response.json();
			if (data.results.length) {
				handleMoviesResponse(data.results, false)
			} else {
				handleMoviesResponse([], false, 'Movie Not Found, Please check the name')
			}
		} catch (error) {
			handleMoviesResponse([], false, 'Error fetching Movies. Please try again later.')
			console.error('Error fetching Movies:', error);
		}
	};

	const fetchMoviesBasedOnGenre = async (query: number) => {
		setIsLoading(true);
		setErrorMessage("");
		setMoviesList([]);
		try {
			const fetchMovieUrl = `${environment.tmdbBaseUrl}${environment.genreSearch}${encodeURIComponent(query)}`
			const response = await fetch(fetchMovieUrl, API_OPTIONS);
			if (!response.ok) {
				handleMoviesResponse([], false, 'Failed to fetch Movies')
				return;
			}
			const data: MovieResponse = await response.json();
			if (data.results.length) {
				handleMoviesResponse(data.results, false)
			} else {
				handleMoviesResponse([], false, 'Movie Not Found, Please check the name')
			}
		} catch (error) {
			handleMoviesResponse([], false, 'Error fetching Movies. Please try again later.')
			console.error('Error fetching Movies:', error);
		}
	}

	// useEffect(() => {
	// 	fetchMovies(searchMovie);
	// }, [searchMovie]);

	// useEffect(() => {
	// 	if (genreSearch) fetchMoviesBasedOnGenre(genreSearch)
	// 	return () => { }
	// }, [genreSearch])


	const handleMoviesResponse = (arrayList: Movie[], loadingState: boolean, errorMessage: string = '') => {
		setMoviesList(arrayList);
		setIsLoading(loadingState);
		setErrorMessage(errorMessage)
	}

	return { moviesList, isLoading, errorMessage };
};

export default useSearchMovies;