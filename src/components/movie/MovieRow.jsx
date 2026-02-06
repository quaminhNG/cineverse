import MovieCard from "./MovieCard";
import axios, { TMDB_IMAGE_BASE_URL } from "../../services/tmdb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MovieRow = ({ title, fetchUrl, isPoster = false }) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="flex flex-col gap-4 py-4 md:py-8">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-2 text-start">
        {title}
      </h2>
      <div className="relative w-full">
        <div className="flex overflow-x-auto gap-2 md:gap-4 no-scrollbar pb-4 snap-x snap-mandatory">
          {movies.map((movie, index) => {
            const imagePath = isPoster ? movie.poster_path : movie.backdrop_path;
            return (
              <div
                key={index}
                onClick={() => navigate('/watch')}
                className={`
                flex-shrink-0 
                snap-center 
                cursor-pointer 
                ${isPoster
                    ? "w-[40vw] md:w-[20vw] lg:w-[15vw] xl:w-[14vw] aspect-[2/3]"
                    : "w-[65vw] md:w-[40vw] lg:w-[23vw] xl:w-[23.5vw] aspect-video"
                  }
              `}
              >
                <MovieCard
                  title={movie.title || movie.name}
                  image={TMDB_IMAGE_BASE_URL + imagePath}
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