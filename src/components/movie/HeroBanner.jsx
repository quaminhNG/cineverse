import ContinueWatchingRow from "./ContinueWatchingRow";
import Button from "../common/Button";
import axios, { TMDB_IMAGE_BASE_URL } from "../../services/tmdb";
import requests from "../../services/requests";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import movieTrailer from "movie-trailer";
import Skeleton from "../common/Skeleton";

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      } catch (error) {
        console.error("Banner API Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const hasWatched = false;

  if (loading) {
    return (
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <Skeleton className="w-full h-full rounded-none" />
        <div className="absolute inset-0 flex items-start pt-32 px-8 md:px-16">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <Skeleton className="h-12 w-3/4 bg-white/10" variant="text" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-20 bg-white/10" variant="text" />
              <Skeleton className="h-6 w-16 bg-white/10" variant="text" />
            </div>
            <Skeleton className="h-24 w-full bg-white/10" variant="text" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32 rounded-full bg-white/10" />
              <Skeleton className="h-12 w-12 rounded-full bg-white/10" variant="circle" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${hasWatched ? "h-[700px] md:h-[800px]" : "h-[500px] md:h-[600px]"} bg-cover bg-center overflow-hidden transition-all duration-500`}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      <div className={`absolute inset-0 flex items-start pt-32 px-8 md:px-16 ${hasWatched ? "pb-60" : "pb-20"}`}>
        <div className="w-full md:w-1/2">
          <div className="flex flex-col gap-6 text-white py-8">
            <h1 className="text-4xl md:text-6xl font-extrabold pb-2">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <div className="flex gap-4 text-white/80 items-center">
              <span className="text-green-400 font-bold">
                {movie?.vote_average ? `${Math.round(movie?.vote_average * 10)}% Match` : "98% Match"}
              </span>
              <span>
                {movie?.release_date?.substring(0, 4) || movie?.first_air_date?.substring(0, 4) || "2024"}
              </span>
              <span className="border border-white/40 px-1 text-xs flex items-center h-fit">
                {movie?.adult ? "18+" : "TV-14"}
              </span>
            </div>

            <p className="text-white/90 text-sm md:text-lg max-w-xl leading-relaxed drop-shadow-md">
              {truncate(movie?.overview, 150)}
            </p>

            <div className="flex items-center gap-6 z-20 relative">
              <Button onClick={() => handleClick(movie)}>
                Let's Watch
              </Button>
              <button
                className="
                p-3
                rounded-full
                bg-white/20
                backdrop-blur-md
                text-white
                shadow-lg
                hover:bg-white/30
                hover:scale-110
                transition-all
                duration-200
              "
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {hasWatched && <ContinueWatchingRow />}
      {/* Bottom fade */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};
export default HeroBanner;