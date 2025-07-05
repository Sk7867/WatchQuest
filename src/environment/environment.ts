//This file is the environment configuration for the application.

export const environment = {
  production: true,
  tmdbBaseUrl: "https://api.themoviedb.org/3",
  discover: "/discover/movie?sort_by=popularity.desc",
  search: "/search/movie?query=",
  trending: "/trending/movie/",
  listGenre: "/genre/movie/list?language=en",
  genreSearch: "/discover/movie?sort_by=popularity.desc&with_genres=",
};
