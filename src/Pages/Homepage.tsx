import React from 'react'
import TrendingMovies from '../components/TrendingMovies/TrendingMovies'
import GenreList from '../components/GenreList.tsx/GenreList'
import MovieCard from '../components/MovieCard'
import MovieCardSkeleton from '../components/MovieCardSkeleton'

interface HomepageProps {
	isLoading: boolean;
	errorMessage: string;
	moviesList: Movie[];
	selectedGenre: number | null;
	handleGenreSelected: (genreId: number) => void
}

const Homepage: React.FC<HomepageProps> = ({ isLoading, errorMessage, moviesList, selectedGenre, handleGenreSelected }) => {
	return (
		<>
			<>
				<TrendingMovies />
				<GenreList selectedGenre={selectedGenre} handleGenreSelected={handleGenreSelected} />
			</>
			<section className="all-movies" id='allMovies'>
				<h2>All Movies</h2>
				{isLoading ? (
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
		</>
	)
}

export default Homepage