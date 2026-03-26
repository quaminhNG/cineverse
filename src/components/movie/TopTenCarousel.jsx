import axios, { TMDB_IMAGE_W500_URL } from "../../services/tmdb";
import requests from "../../services/requests";
import useMovieNavigation from "../../hooks/useMovieNavigation";
import { FaPlay } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";

const TopTenCarousel = () => {
    const handleMovieClick = useMovieNavigation();

    const { data: movies, isLoading } = useQuery({
        queryKey: ["top10"],
        queryFn: async () => {
            const response = await axios.get(requests.fetchTopRated);
            return response.data.results.slice(0, 10);
        },
    });

    if (isLoading || !movies || movies.length === 0) return null;

    return (
        <div className="w-full my-8 relative">
            <h2 className="text-2xl font-bold mb-4 px-4 text-white flex items-center gap-2">
                <span className="text-cineverse-main">Top 10</span>
                Trending Movies Today
            </h2>

            <div className="relative">
                <div className="flex overflow-x-auto no-scrollbar gap-x-6 px-4 pb-8 pt-4 snap-x snap-mandatory">
                    {movies.map((movie, index) => (
                        <div
                            key={movie.id}
                            onClick={() => handleMovieClick(movie)}
                            className="relative flex-none w-[180px] md:w-[220px] h-[270px] md:h-[330px] snap-start cursor-pointer hover:scale-105 transition-transform duration-300 group"
                        >
                            {/* Số thứ tự khổng lồ (Nằm đè 1 phần ra ngoài Poster) */}
                            <div className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                                <span className="text-[140px] md:text-[200px] font-black leading-none tracking-tighter text-[#141414] drop-shadow-lg" style={{
                                    WebkitTextStroke: '4px #5FB3FF',
                                    textShadow: 'rgba(95, 179, 255, 0.4) 0px 0px 20px'
                                }}>
                                    {index + 1}
                                </span>
                            </div>

                            {/* Poster phim */}
                            <div className="absolute right-0 w-[80%] h-full rounded-lg overflow-hidden shadow-2xl z-20 bg-gray-900 border border-white/5">
                                <img
                                    src={`${TMDB_IMAGE_W500_URL}${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Lớp mờ và Icon Play khuất khi hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/30">
                                        <FaPlay className="text-white text-xl ml-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bóng mờ để biết còn cuộn được */}
                <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#141414] to-transparent pointer-events-none z-30" />
            </div>
        </div>
    );
};

export default TopTenCarousel;
