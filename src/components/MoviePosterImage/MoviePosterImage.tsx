import React from 'react'

interface IMoviePosterImageProps {
    posterPath?: string;
    altText?: string;
}

const MoviePosterImage: React.FC<IMoviePosterImageProps> = ({ posterPath, altText }) => {
    return (
        <div className="w-full lg:w-1/3 object-contain">
            <img
                src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : '/no-movie.png'}
                alt={altText || 'Movie Poster'}
                className="object-contain w-full h-full"
            />
        </div>
    )
}

export default MoviePosterImage