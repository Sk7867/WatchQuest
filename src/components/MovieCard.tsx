interface IMovieProps {
    movie: Movie
}

const MovieCard = (props: IMovieProps) => {
    const { id, title, poster_path, vote_average, original_language, release_date } = props.movie
    return (
        <div className='movie-card' key={id}>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} loading="lazy" />
            <div className="mt-4">
                <h3>{title}</h3>
            </div>
            <div className="content">
                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>
                <span>•</span>
                <p className="lang">
                    {original_language}
                </p>
                <span>•</span>
                <p className="year">
                    {release_date ? release_date.split('-')[0] : 'N/A'}
                </p>
            </div>
            {/* <p key={id} className='text-white'>{title}</p> */}
        </div>
    )
}

export default MovieCard    