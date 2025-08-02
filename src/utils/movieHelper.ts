//Write a helper function to filter object with job "Director" and return an array of names using IMovieCreditsResponse as refecnce
export const filterDirectors = (crew: Crew[]) => {
  return crew
    .filter((member) => member.job === "Director")
    .map((director) => director.name);
};

//write a helper function to filter object with job "Writer" and return an array of names using IMovieCreditsResponse as reference
export const filterWriters = (crew: Crew[]) => {
  return crew
    .filter((member) => member.job === "Writer")
    .map((writer) => writer.name);
};

//writer a helper function which returns an array of names from cast using IMovieCreditsResponse as reference
export const filterCast = (cast: Cast[]) => {
  return cast.map((member) => member.name);
};

//writer a hepler function that returns an array of genres from IMovieDetailsResponse
export const getGenres = (genres: Genre[]) => {
  return genres.map((genre) => genre.name);
};

//write a helper function to covert runtime in minutes to hours and minutes format
export const formatRuntime = (runtime: number) => {
  if (!runtime) return "N/A"; // Handle case where runtime is not provided
  if (runtime < 0) return "N/A"; // Handle negative runtime
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
};

//write a helper function to format release date and return the year
export const formatReleaseDate = (releaseDate: string) => {
  if (!releaseDate) return "N/A"; // Handle case where release date is not provided
  const date = new Date(releaseDate);
  return date.getFullYear().toString();
};

//write a helper function which take vote_average and returns rounded value
export const formatVoteAverage = (voteAverage: number) => {
  if (typeof voteAverage === "number" && !isNaN(voteAverage)) {
    return parseFloat(voteAverage.toFixed(1));
  }
};

export const formatLanguages = (languages: Spokenlanguage[]) => {
  if (!languages || languages.length === 0) return "N/A";
  return languages.map((lang) => lang.english_name).join(", ");
};
