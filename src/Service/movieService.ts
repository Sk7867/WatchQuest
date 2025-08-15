import { environment } from "../environment/environment";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMovieDetailsService = async (movieId: string) => {
  const getMovieUrl = `${environment.tmdbBaseUrl}${environment.movieDetails}${movieId}`;
  const response = await fetch(getMovieUrl, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  const movieDetailsObj: IMovieDetailsResponse = await response.json();
  return movieDetailsObj;
};

export const fetchMovieCreditsService = async (movieId: string) => {
  const getMovieCreditsUrl = `${environment.tmdbBaseUrl}${environment.movieDetails}${movieId}/credits`;
  const response = await fetch(getMovieCreditsUrl, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch movie credits");
  }
  const movieCredits: IMovieCreditsResponse = await response.json();
  return movieCredits;
};

export const fetchTrendingMoviesService = async (
  time_period: string = "day"
) => {
  const trendingMoviesUrl = `${environment.tmdbBaseUrl}${environment.trending}${time_period}?language=en-US`;
  const response = await fetch(trendingMoviesUrl, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  const trendingMoviesObj: MovieResponse = await response.json();
  return trendingMoviesObj;
};

export const fetchMoviesService = async (query = "") => {
  const fetchMovieUrl = query
    ? `${environment.tmdbBaseUrl}${environment.search}${encodeURIComponent(
        query
      )}`
    : `${environment.tmdbBaseUrl}${environment.discover}`;
  const response = await fetch(fetchMovieUrl, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }
  const movieListArray: MovieResponse = await response.json();
  return movieListArray;
};

export const fetchGenresService = async () => {
  const fetchGenreUrl = `${environment.tmdbBaseUrl}${environment.listGenre}`;
  const response = await fetch(fetchGenreUrl, API_OPTIONS);
  if (!response.ok) {
    throw new Error("Failed to fetch genres");
  }
  const genreListArray: { genres: genre[] } = await response.json();
  return genreListArray;
};
