import React from 'react'
import TrendingMovies from '../components/TrendingMovies/TrendingMovies'
import GenreList from '../components/GenreList.tsx/GenreList'
import Spinner from '../components/Spinner'
import MovieCard from '../components/MovieCard'

interface HomepageProps {
	isLoading: boolean;
	errorMessage: string;
	moviesList: Movie[];
}

const Homepage: React.FC<HomepageProps> = ({ isLoading, errorMessage, moviesList }) => {
	return (
		<main>
			<div className="pattern">
				<div className="wrapper">
					<TrendingMovies />
					<GenreList />
					<section className="all-movies">
						<h2>All Movies</h2>
						{isLoading ? (
							<Spinner />
						) : errorMessage ? (
							<p className="text-red-500">{errorMessage}</p>
						) : (
							<ul>
								{moviesList.map((movie) => (
									<MovieCard key={movie.id} movie={movie} />
								))}
							</ul>
						)}
					</section>
				</div>
			</div>
		</main>
	)
}

export default Homepage