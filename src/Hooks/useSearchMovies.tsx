import { useEffect, useState } from 'react'
import { environment } from '../environment/environment';
import { fetchMoviesService } from '../Service/movieService';

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
		handleMoviesResponse([], true, '')
		if (genreId) {
			fetchMoviesBasedOnGenre(genreId)
		} else {
			fetchMovies(searchMovie)
		}
		return () => { }
	}, [searchMovie, genreId])


	const fetchMovies = async (query = '') => {
		try {
			const movieListArray = await fetchMoviesService(query);
			if (movieListArray.results.length) {
				handleMoviesResponse(movieListArray.results, false)
				if (query) {
					scrollToAllMoviesSection();
				}
			}
			else {
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
				if (query) {
					scrollToAllMoviesSection();
				}
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

	const scrollToAllMoviesSection = () => {
		setTimeout(() => {
			const allMoviesSection = document.getElementById('allMovies');
			const headerContainer = document.getElementById('header');
			console.log('All Movies Section:', allMoviesSection);
			if (allMoviesSection && headerContainer) {
				const headerHeight = headerContainer.getBoundingClientRect().height; // Adding some margin
				const sectionTop = allMoviesSection.getBoundingClientRect().top + window.scrollY;
				const genreSection = 150;
				window.scroll({
					behavior: 'smooth',
					top: sectionTop - headerHeight - genreSection
				});
			}
		}, 500);
	}

	return { moviesList, isLoading, errorMessage };
};

export default useSearchMovies;