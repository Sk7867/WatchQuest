const MovieCardSkeleton = () => {
    return (
        <div className="movie-card animate-pulse">
            <div className="bg-gray-700 rounded-lg w-full h-[370px] mb-4"></div>
            <div className="mt-4">
                <div className="h-5 bg-gray-600 rounded w-3/4 mb-2"></div>
            </div>
            <div className="content flex items-center gap-2 mt-2">
                <div className="rating flex items-center gap-1">
                    <div className="bg-gray-600 rounded-full w-4 h-4"></div>
                    <div className="h-4 bg-gray-600 rounded w-8"></div>
                </div>
                <span className="text-gray-600">•</span>
                <div className="lang h-4 bg-gray-600 rounded w-8"></div>
                <span className="text-gray-600">•</span>
                <div className="year h-4 bg-gray-600 rounded w-10"></div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
