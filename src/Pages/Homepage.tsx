import React from 'react'
import TrendingMovies from '../components/TrendingMovies/TrendingMovies'
import GenreList from '../components/GenreList.tsx/GenreList'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'

interface HomepageProps {
	isLoading: boolean;
	searchTerm: string;
	errorMessage: string;
	moviesList: Movie[];
}

const Homepage: React.FC<HomepageProps> = ({ isLoading, errorMessage, moviesList, searchTerm }) => {
	return (
		<main>
			<div className="pattern">
				<div className="wrapper">
					{!searchTerm && (
						<>
							<TrendingMovies />
							<GenreList />
						</>
					)}
					<section className="all-movies">
						<h2>All Movies</h2>
						{isLoading ? (
							<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{Array.from({ length: 8 }).map((_, index) => (
									<MovieCardSkeleton key={index} />
								))}
							</ul>
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