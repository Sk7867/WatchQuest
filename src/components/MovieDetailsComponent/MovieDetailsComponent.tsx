import React, { useState } from 'react'
import ShowMeta from '../ShowMeta/ShowMeta';
import MovieGenre from '../MovieGenre/MovieGenre';
import Slider from '../Slider/Slider';

interface IMovieDetailsComponentProps {
  movieDetails: IMovieDetailsResponse;
  movieCredits?: IMovieCredits; // Optional prop for movie credits
  // movieCreators: string[];
  // movieCast: string[];
}

const MovieDetailsComponent: React.FC<IMovieDetailsComponentProps> = ({ movieDetails, movieCredits, }) => {
  const [showAll, setShowAll] = useState(false);
  const castToShow = showAll ? movieCredits?.cast : movieCredits?.cast?.slice(0, 6);
  const handleShowAll = () => {
    setShowAll(!showAll);
  }
  return (
    <div className=" flex flex-col justify-start w-full md:w-2/3 space-y-4">
      <h2 className="text-[2rem] font-bold">{movieDetails.title}</h2>

      <ShowMeta movieDetails={movieDetails} />

      {movieDetails.genreList?.length ? (
        <Slider>
          {movieDetails.genreList.map((genre, index) => (
            <><MovieGenre key={index} genre={genre} /></>
          ))}
        </Slider>
      ) : null}

      <p className="text-[1rerm] text-gray-300">
        {movieDetails.overview || 'No description available.'}
      </p>

      <div>
        {
          movieCredits?.directors && movieCredits.directors.length > 0 && (
            <p className="text-[1rem] text-gray-400">
              <span className="font-semibold text-white">Director:</span>{" "}
              <span className="text-pink-400">{movieCredits.directors.join(', ')}</span>
            </p>
          )
        }
        {
          movieCredits?.writers && movieCredits.writers.length > 0 && (
            <p className="text-[1rem] text-gray-400 mt-1">
              <span className="font-semibold text-white">Writers:</span>{" "}
              <span className="text-pink-400">{movieCredits.writers.join(', ')}</span>
            </p>
          )
        }
        {
          movieCredits?.cast && movieCredits.cast.length > 0 && (
            <div className="text-[1rem] text-gray-400 mt-1">
              <span className="font-semibold text-white">Cast:</span>{" "}
              <span className="text-pink-400">
                {
                  <>
                    {castToShow?.join(', ')}
                    {movieCredits.cast.length > 6 && (
                      <>
                        {" "}
                        <button
                          className="text-blue-400 underline ml-1"
                          onClick={() => handleShowAll()}
                          type="button"
                        >
                          {showAll ? 'Show Less' : 'Show More'}
                        </button>
                      </>
                    )}
                  </>
                }
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MovieDetailsComponent