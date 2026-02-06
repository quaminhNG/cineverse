import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../services/tmdb";
import MovieCard from "../components/movie/MovieCard";
import Skeleton from "../components/common/Skeleton";
import { TMDB_IMAGE_W500_URL } from "../services/tmdb";
import movieTrailer from "movie-trailer";

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      async function fetchSearch() {
        setLoading(true);
        try {
          const request = await axios.get(
            `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
          );
          const results = request.data.results.filter(
            (item) => item.media_type !== "person" && (item.backdrop_path || item.poster_path)
          );
          setMovies(results);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchSearch();
    }
  }, [query, API_KEY]);

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
          // ignore
        }
      }

      if (!trailerId && movie.media_type !== "person") {
        try {
          const movieName = movie.title || movie.name || "";
          trailerId = await movieTrailer(movieName, { id: true });
        } catch (e) {
          console.error(e);
        }
      }

      navigate("/watch", { state: { movie: movie, trailerId: trailerId } });
    }
  }

  return (
    <div className="pt-24 px-4 md:px-16 min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-cineverse-cyan">"{query}"</span>
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3]">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="aspect-[2/3] cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => handleClick(movie)}
            >
              <MovieCard
                title={movie.title || movie.name}
                image={TMDB_IMAGE_W500_URL + (movie.poster_path || movie.backdrop_path)}
                isVertical={true}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-xl">No results found for "{query}"</p>
          <p className="text-sm mt-2">Try searching for something else.</p>
        </div>
      )}
    </div>
  );
};

export default Search;