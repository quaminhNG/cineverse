import MovieCard from "./MovieCard";
import axios, { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_W500_URL } from "../../services/tmdb";
import { useEffect, useState } from "react";
import Skeleton from "../common/Skeleton";
import useMovieNavigation from "../../hooks/useMovieNavigation";

const MovieRow = ({ title, fetchUrl, isPoster = false }) => {
  const handleMovieClick = useMovieNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchUrl]);
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
                  className={`
                  flex-shrink-0 
                  snap-center 
                  cursor-pointer 
                  transition-transform 
                  duration-300
                  hover:scale-105
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
    </div>
  );
};

export default MovieRow;