import { useEffect, useState, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import MovieHoverCard from "./MovieHoverCard";
import axios, { TMDB_IMAGE_W500_URL } from "../../services/tmdb";
import { cachedGet } from "../../services/tmdbCache";
import Skeleton from "../common/Skeleton";
import useMovieNavigation from "../../hooks/useMovieNavigation";

const HOVER_DELAY = 500;

const MovieRow = ({ title, fetchUrl, isPoster = false }) => {
  const handleMovieClick = useMovieNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hoverMovie, setHoverMovie] = useState(null);
  const [hoverRect, setHoverRect] = useState(null);
  const hoverTimerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const request = await cachedGet(axios, fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleMouseEnter = useCallback((movie, e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    hoverTimerRef.current = setTimeout(() => {
      setHoverMovie(movie);
      setHoverRect(rect);
    }, HOVER_DELAY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoverMovie(null);
      setHoverRect(null);
    }, 100);
  }, []);

  const closeHoverCard = useCallback(() => {
    clearTimeout(hoverTimerRef.current);
    setHoverMovie(null);
    setHoverRect(null);
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 md:py-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 text-start pl-4 md:pl-0">
        {title}
      </h2>
      <div className="relative w-full">
        <div className="flex overflow-x-auto gap-2 md:gap-4 no-scrollbar pb-4 snap-x snap-mandatory px-4 md:px-0">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className={`flex-shrink-0 snap-center ${isPoster
                  ? "w-[40vw] md:w-[20vw] lg:w-[15vw] xl:w-[14vw] aspect-[2/3]"
                  : "w-[65vw] md:w-[40vw] lg:w-[23vw] xl:w-[23.5vw] aspect-video"
                  }`}
              >
                <Skeleton className="w-full h-full" />
              </div>
            ))
            : movies.map((movie, index) => {
              const imagePath = isPoster ? movie.poster_path : movie.backdrop_path;
              return (
                <div
                  key={index}
                  onClick={() => handleMovieClick(movie)}
                  onMouseEnter={(e) => handleMouseEnter(movie, e)}
                  onMouseLeave={handleMouseLeave}
                  className={`
                  flex-shrink-0 
                  snap-center 
                  cursor-pointer 
                  z-0
                  hover:z-10
                  ${isPoster
                      ? "w-[40vw] md:w-[20vw] lg:w-[15vw] xl:w-[14vw] aspect-[2/3]"
                      : "w-[65vw] md:w-[40vw] lg:w-[23vw] xl:w-[23.5vw] aspect-video"
                    }
                `}
                >
                  <MovieCard
                    title={movie.title || movie.name}
                    image={TMDB_IMAGE_W500_URL + imagePath}
                    isVertical={isPoster}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {hoverMovie && hoverRect && (
        <div
          style={{ position: 'absolute', zIndex: 9999 }}
          onMouseEnter={() => clearTimeout(hoverTimerRef.current)}
          onMouseLeave={handleMouseLeave}
        >
          <MovieHoverCard
            movie={hoverMovie}
            anchorRect={hoverRect}
            onClose={closeHoverCard}
            onPlay={() => {
              closeHoverCard();
              handleMovieClick(hoverMovie);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MovieRow;