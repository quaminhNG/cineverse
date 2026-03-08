import { useEffect, useState } from "react";
import axios, { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_W500_URL } from "../../services/tmdb";
import { cachedGet } from "../../services/tmdbCache";
import requests from "../../services/requests";
import useMovieNavigation from "../../hooks/useMovieNavigation";
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const InteractiveShowcase = () => {
    const [movies, setMovies] = useState([]);
    const [activeMovie, setActiveMovie] = useState(null);
    const handleMovieClick = useMovieNavigation();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await cachedGet(axios, requests.fetchTrending);
                const topMovies = response.data.results.slice(0, 6);
                setMovies(topMovies);
                if (topMovies.length > 0) {
                    setActiveMovie(topMovies[0]);
                }
            } catch (error) {
                console.error("Error fetching movies for interactive showcase:", error);
            }
        }
        fetchData();
    }, []);

    if (!activeMovie) return null;

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <div className="relative w-full h-[600px] mb-12 mt-4 rounded-xl overflow-hidden bg-[#141414] flex flex-col md:flex-row group border border-white/10 shadow-2xl">
            <div className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out">
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent z-10" />
                <img
                    key={activeMovie?.id}
                    src={`${TMDB_IMAGE_BASE_URL}${activeMovie?.backdrop_path || activeMovie?.poster_path}`}
                    alt={activeMovie?.title || activeMovie?.name}
                    className="w-full h-full object-cover object-right-top opacity-100 animate-fade-in"
                />
            </div>

            <div className="relative z-20 w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center h-full">
                <span className="text-cineverse-main font-bold text-sm tracking-widest mb-2 uppercase">
                    Cineverse Spotlight
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-4 text-white drop-shadow-xl truncate">
                    {activeMovie?.title || activeMovie?.name || activeMovie?.original_name}
                </h2>

                <div className="flex items-center gap-4 mb-6 text-sm font-semibold text-gray-300">
                    <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded">
                        {(activeMovie.vote_average * 10).toFixed(0)}% Match
                    </span>
                    <span>{activeMovie.release_date?.substring(0, 4) || activeMovie.first_air_date?.substring(0, 4)}</span>
                    <span className="border border-gray-400 px-2 py-0.5 rounded text-xs bg-black/30">HD</span>
                </div>

                <p className="text-gray-300 text-base md:text-lg mb-8 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl">
                    {truncate(activeMovie?.overview, 250)}
                </p>

                <div className="flex gap-4">
                    <button
                        onClick={() => handleMovieClick(activeMovie)}
                        className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition-all font-bold group/btn shadow-lg hover:scale-105"
                    >
                        <FaPlay className="text-xl group-hover/btn:text-cineverse-main transition-colors" />
                        <span>Xem Ngay</span>
                    </button>
                    <button
                        onClick={() => handleMovieClick(activeMovie)}
                        className="flex items-center justify-center gap-2 bg-gray-600/50 text-white px-8 py-3 rounded-lg hover:bg-gray-500/70 transition-all font-bold backdrop-blur-md shadow-lg hover:scale-105"
                    >
                        <FaInfoCircle className="text-xl" />
                        <span>Chi Tiết</span>
                    </button>
                </div>
            </div>

            {/* Cột phải / Dưới: Danh sách phim Hot dạng thẻ (Cards) */}
            <div className="relative z-20 w-full md:w-[45%] p-6 md:p-8 h-full bg-gradient-to-t md:bg-gradient-to-l from-[#141414] via-[#141414]/80 to-transparent flex flex-col justify-end">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white border-l-4 border-cineverse-main pl-3">
                        Đang Thịnh Hành
                    </h3>
                </div>

                <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x snap-mandatory">
                    {movies.map((movie, index) => {
                        const isActive = activeMovie?.id === movie.id;
                        return (
                            <div
                                key={movie.id}
                                onMouseEnter={() => setActiveMovie(movie)}
                                onClick={() => handleMovieClick(movie)}
                                className={`snap-start relative shrink-0 w-32 md:w-40 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group/item border-2 ${isActive
                                    ? 'border-cineverse-main shadow-[0_0_20px_rgba(95,179,255,0.4)] scale-105'
                                    : 'border-transparent hover:border-white/30'
                                    }`}
                            >
                                {/* Ảnh Poster (thay vì backdrop cho đẹp dọc) */}
                                <div className="aspect-[2/3] w-full relative">
                                    <img
                                        src={`${TMDB_IMAGE_W500_URL}${movie?.poster_path || movie?.backdrop_path}`}
                                        alt={movie?.title || movie?.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110"
                                    />
                                    {/* Lớp phủ gradient đen ở dưới card */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>

                                    {/* Số thứ hạng bự chà bá */}
                                    <span className="absolute -left-2 -bottom-4 text-7xl font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)] drop-shadow-lg opacity-80 z-10 font-sans">
                                        {index + 1}
                                    </span>
                                </div>

                                {isActive && (
                                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-20">
                                        <div className="bg-cineverse-main/80 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm">
                                            <FaPlay className="text-white text-sm" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default InteractiveShowcase;
