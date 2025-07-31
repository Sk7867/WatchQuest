import React from 'react'

interface IShowMetaProps {
	movieDetails: IMovieDetailsResponse;
}

const ShowMeta: React.FC<IShowMetaProps> = ({ movieDetails }) => {
	const maxStars = 10
	return (
		<div className="flex items-center text-sm text-gray-400 space-x-4 flex-wrap lead">
			<div className="flex items-center m-0 text=[1rem]">
				{typeof movieDetails.vote_average === 'number' && !isNaN(movieDetails.vote_average) ? (
					<>
						{[...Array(maxStars)].map((_, i) => (
							i < (movieDetails.formatVoteAverage ?? 0) ? (
								<svg key={i} className="text-yellow-400 w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
									<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
								</svg>
							) : (
								<svg key={i} className="text-gray-400 w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
									<path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
								</svg>
							)
						))}
						<span className="ml-2 text-white font-semibold">{movieDetails.formatVoteAverage} / 10</span>
					</>
				) : null}
			</div>
			<div className="border-l border-gray-600 h-4 mx-2"></div>
			{/* <span>TV-14</span> */}
			<span className='m-0 text-[1rem]'>{movieDetails.formattedRuntime}</span>
			<div className="border-l border-gray-600 h-4 mx-2"></div>
			<span className='m-0 text-[1rem]'>{movieDetails.genreList}</span>
			<div className="border-l border-gray-600 h-4 mx-2"></div>
			<span className='m-0 text-[1rem]'>({movieDetails.formattedReleaseYear})</span>
		</div>
	)
}

export default ShowMeta