import React from 'react'

interface IMoviePosterImageProps {
    posterPath?: string;
    altText?: string;
}

const MoviePosterImage: React.FC<IMoviePosterImageProps> = ({ posterPath, altText }) => {
    return (
        <div className="w-full md:w-1/3">
            <img
                src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : '/no-movie.png'}
                alt={altText || 'Movie Poster'}
                className="object-cover w-full h-full"
            />
        </div>
    )
}

export default MoviePosterImage