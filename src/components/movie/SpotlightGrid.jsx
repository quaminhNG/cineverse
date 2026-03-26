import axios, { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_W500_URL } from "../../services/tmdb";
import requests from "../../services/requests";
import useMovieNavigation from "../../hooks/useMovieNavigation";
import { FaPlay } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";

const SpotlightGrid = () => {
    const handleMovieClick = useMovieNavigation();

    const { data: movies, isLoading } = useQuery({
        queryKey: ["spotlight"],
        queryFn: async () => {
            const response = await axios.get(requests.fetchTrending);
            return response.data.results.slice(0, 5);
        },
    });

    if (isLoading || !movies || movies.length < 5) return null;

    const mainMovie = movies[0];
    const subMovies = movies.slice(1, 5);

    return (
        <div className="w-full my-12">
            <h2 className="text-3xl font-black mb-6 px-4 text-white uppercase tracking-wider border-l-4 border-cineverse-main">
                Featured <span className="text-cineverse-main">Spotlight</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4">
                {/* Khung lớn bên trái */}
                <div
                    className="lg:col-span-2 relative h-[400px] lg:h-[600px] rounded-none overflow-hidden group cursor-pointer shadow-2xl"
                    onClick={() => handleMovieClick(mainMovie)}
                >
                    <img
                        src={`${TMDB_IMAGE_BASE_URL}${mainMovie.backdrop_path || mainMovie.poster_path}`}
                        alt={mainMovie.title || mainMovie.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-20">
                        <span className="bg-cineverse-main text-black text-xs font-bold px-3 py-1 rounded-none uppercase tracking-widest mb-3 inline-block shadow-lg">
                            #1 Trending
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-md">
                            {mainMovie.title || mainMovie.name || mainMovie.original_name}
                        </h3>
                        <p className="text-gray-200 line-clamp-2 md:line-clamp-3 max-w-2xl text-sm md:text-base mb-4 drop-shadow-md hidden md:block">
                            {mainMovie.overview}
                        </p>

                    </div>

                    {/* Nút Play to bự khi hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative bg-cineverse-main/90 text-white w-20 h-20 flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(95,179,255,0.6)] hover:scale-110 transition-transform">
                            <FaPlay className="text-3xl ml-2" />
                        </div>
                    </div>
                </div>

                {/* 4 Khung nhỏ bên phải */}
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px] lg:h-[600px]">
                    {subMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative rounded-none overflow-hidden group cursor-pointer shadow-xl"
                            onClick={() => handleMovieClick(movie)}
                        >
                            <img
                                src={`${TMDB_IMAGE_W500_URL}${movie.backdrop_path || movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                            <div className="absolute bottom-0 left-0 p-4 w-full z-20">
                                <h4 className="text-sm md:text-lg font-bold text-white mb-1 truncate group-hover:text-cineverse-main transition-colors drop-shadow-md">
                                    {movie.title || movie.name || movie.original_name}
                                </h4>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-300">
                                    <span className="text-green-400 font-medium">★ {movie.vote_average?.toFixed(1)}</span>
                                    <span>•</span>
                                    <span>{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
                                </div>
                            </div>

                            {/* Tiny Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                                <div className="absolute inset-0 bg-black/30"></div>
                                <div className="relative bg-white/20 text-white w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-sm border border-white/50 group-hover:bg-cineverse-main group-hover:border-cineverse-main group-hover:shadow-[0_0_15px_rgba(95,179,255,0.5)] transition-all">
                                    <FaPlay className="text-sm ml-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpotlightGrid;
