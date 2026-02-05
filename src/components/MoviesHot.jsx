import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { TMDB_IMAGE_BASE_URL } from "../services/tmdb";
import requests from "../services/requests";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const MoviesHot = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchTrending);
                setMovies(request.data.results);
            } catch (error) {
                console.error("Error fetching hot movies:", error);
            }
        }
        fetchData();
    }, []);

    const {
        containerRef,
        activeIndex,
        setActiveIndex,
        scrollToIndex,
        handleScroll,
        totalItems
    } = useInfiniteScroll(movies, {
        repeatCount: 30,
        bufferSets: 5
    });

    if (movies.length === 0) return null;

    return (
        <div className="flex flex-col gap-4 w-full">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 text-left">
                Movies Hot
            </h2>
            <div
                ref={containerRef}
                className="relative flex overflow-x-auto overflow-y-hidden w-full py-14 no-scrollbar px-[27.5vw] md:px-[42.857143vw]"
                onScroll={handleScroll}
            >
                {[...Array(totalItems)].map((_, index) => {
                    const movie = movies[index % movies.length];
                    if (!movie) return null;
                    const distance = Math.abs(index - activeIndex);

                    let scaleClass = "scale-100 opacity-50";
                    if (distance === 0) scaleClass = "scale-125 z-20 opacity-100";
                    else if (distance === 1) scaleClass = "scale-110 z-10 opacity-80";
                    else if (distance === 2) scaleClass = "scale-105 opacity-60";

                    return (
                        <div
                            key={index}
                            onClick={() => {
                                if (index === activeIndex) {
                                    navigate('/watch');
                                } else {
                                    setActiveIndex(index);
                                    scrollToIndex(index);
                                }
                            }}
                            className={`
                relative group
                flex-shrink-0
                transition-transform
                duration-300
                ${scaleClass}
                w-[45vw]
                md:w-[14.285714vw]
              `}
                        >
                            <img
                                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="w-full aspect-[2/3] object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-60 rounded-md pointer-events-none" />
                            <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                                <h5 className="text-[8px] md:text-[10px] font-extrabold tracking-widest text-transparent bg-clip-text bg-cineverse-gradient drop-shadow-md opacity-90 transition-all duration-500 group-hover:brightness-125 group-hover:drop-shadow-[0_0_8px_rgba(143,239,255,0.8)]">
                                    CINEVERSE
                                </h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MoviesHot;
