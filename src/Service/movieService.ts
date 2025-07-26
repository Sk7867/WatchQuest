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
