import MovieCard from "./MovieCard";
import axios, { TMDB_IMAGE_BASE_URL } from "../services/tmdb";
import { useEffect, useState } from "react";
const MovieRow = ({ title = "Trending Now", movies = [...Array(7)], isVertical = false }) => {
  // const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      return console.log("waiting...");
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-4 py-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 text-start">
        {title}
      </h2>
      <div className="relative w-full">
        <div className="flex overflow-x-auto gap-2 md:gap-4 no-scrollbar pb-4 snap-x snap-mandatory">
          {movies.map((_, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 
                snap-center 
                ${isVertical
                  ? "w-[40vw] md:w-[20vw] lg:w-[15vw] xl:w-[14vw] aspect-[2/3]"
                  : "w-[65vw] md:w-[40vw] lg:w-[23vw] xl:w-[23.5vw] aspect-video"
                }
              `}
            >
              <MovieCard
                title={`Movie ${index + 1}`}
                image="/src/assets/images/hero-banner.png"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;