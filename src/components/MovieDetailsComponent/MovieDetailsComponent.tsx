import React from 'react'
import ShowMeta from '../ShowMeta/ShowMeta';
import MovieGenre from '../MovieGenre/MovieGenre';
import Slider from '../Slider/Slider';
import PersonCard from '../PersonCard/PersonCard';

interface IMovieDetailsComponentProps {
  movieDetails: IMovieDetailsResponse;
  movieCredits?: IMovieCredits; // Optional prop for movie credits
  // movieCreators: string[];
  // movieCast: string[];
}

const MovieDetailsComponent: React.FC<IMovieDetailsComponentProps> = ({ movieDetails, movieCredits, }) => {
  // const [showAll, setShowAll] = useState(false);
  // const castToShow = showAll ? movieCredits?.cast : movieCredits?.cast?.slice(0, 6);
  // const handleShowAll = () => {
  //   setShowAll(!showAll);
  // }
  return (
    <div className=" flex flex-col justify-start w-full lg:w-2/3 space-y-4">
      <h2 className="text-[2rem] font-bold">{movieDetails.title}</h2>

      <ShowMeta movieDetails={movieDetails} />

      {movieDetails.genreList?.length ? (
        <Slider>
          {movieDetails.genreList.map((genre, index) => (
            <MovieGenre key={index} genre={genre} />
          ))}
        </Slider>
      ) : null}

      <p className="text-[1rem] text-gray-300">
        {movieDetails.overview || 'No description available.'}
      </p>

      <div>
        {
          movieCredits?.directors && movieCredits.directors.length > 0 && (
            <div className="text-[1rem] text-gray-400">
              <span className="font-semibold text-white">Director:</span>{" "}
              {/* <span className="text-pink-400">{movieCredits.directors.join(', ')}</span> */}
              <Slider>
                {movieCredits.directors.map((director, index) => (
                  <PersonCard
                    key={index}
                    imageUrl={director.profile_path ? `https://image.tmdb.org/t/p/w500/${director.profile_path}` : '/no-person.png'}
                    name={director.name}
                    imageSize="md" />
                ))}
              </Slider>
            </div>
          )
        }
        {
          movieCredits?.writers && movieCredits.writers.length > 0 && (
            <div className="text-[1rem] text-gray-400 mt-1">
              <span className="font-semibold text-white">Writers:</span>{" "}
              {/* <span className="text-pink-400">{movieCredits.writers.join(', ')}</span> */}
              <Slider>
                {movieCredits.writers.map((writer, index) => (
                  <PersonCard
                    key={index}
                    imageUrl={writer.profile_path ? `https://image.tmdb.org/t/p/w500/${writer.profile_path}` : '/no-person.png'}
                    name={writer.name}
                    imageSize="md" />
                ))}
              </Slider>
            </div>
          )
        }
        {
          movieCredits?.cast && movieCredits.cast.length > 0 && (
            <div className="text-[1rem] text-gray-400 mt-1 overflow-y-hidden max-w-[90vw] lg:max-w-3xl">
              <span className="font-semibold text-white">Cast:</span>{" "}
              {/* <span className="text-pink-400">
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
              </span> */}
              <Slider>
                {movieCredits.cast.map((member, index) => (
                  <PersonCard
                    key={index}
                    imageUrl={member.profile_path ? `https://image.tmdb.org/t/p/w500/${member.profile_path}` : '/no-person.png'}
                    name={member.name}
                    imageSize="md" />
                ))}
              </Slider>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MovieDetailsComponent