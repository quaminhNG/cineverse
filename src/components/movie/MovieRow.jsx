import MovieCard from "./MovieCard";
import axios, { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_W500_URL } from "../../services/tmdb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import movieTrailer from "movie-trailer";
import Skeleton from "../common/Skeleton";

const MovieRow = ({ title, fetchUrl, isPoster = false }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const handleClick = async (movie) => {
    if (movie) {
      let trailerId = null;

      try {
        const movieVideos = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        const movieTrailer = movieVideos.data.results?.find(
          (vid) => vid.name === "Official Trailer" || (vid.type === "Trailer" && vid.site === "YouTube")
        );
        if (movieTrailer) trailerId = movieTrailer.key;
      } catch (e) {
      }

      if (!trailerId) {
        try {
          const tvVideos = await axios.get(
            `/tv/${movie.id}/videos?api_key=${API_KEY}`
          );
          const tvTrailer = tvVideos.data.results?.find(
            (vid) => vid.name === "Official Trailer" || (vid.type === "Trailer" && vid.site === "YouTube")
          );
          if (tvTrailer) trailerId = tvTrailer.key;
        } catch (e) {
        }
      }

      if (!trailerId) {
        try {
          const movieName = movie.title || movie.name || "";
          trailerId = await movieTrailer(movieName, { id: true });
        } catch (e) {
          console.error("movie-trailer error:", e);
        }
      }

      navigate("/watch", { state: { movie: movie, trailerId: trailerId } });
    }
  };
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
                  onClick={() => handleClick(movie)}
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