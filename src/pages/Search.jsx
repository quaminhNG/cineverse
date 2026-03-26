import { useLocation, useNavigate } from "react-router-dom";
import axios from "../services/tmdb";
import MovieCard from "../components/movie/MovieCard";
import Skeleton from "../components/common/Skeleton";
import { TMDB_IMAGE_W500_URL } from "../services/tmdb";
import movieTrailer from "movie-trailer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const query = new URLSearchParams(location.search).get("q");

  // Hook theo dõi khi cuộn đến cuối trang
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px', // Nạp trước khi còn cách đáy 100px
  });

  // Sử dụng useInfiniteQuery để quản lý phân trang
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(
        `/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageParam}&include_adult=false`
      );
      const results = response.data.results.filter(
        (item) => item.media_type !== "person" && (item.backdrop_path || item.poster_path)
      );
      return {
        results,
        nextPage: pageParam < response.data.total_pages ? pageParam + 1 : undefined
      };
    },
    enabled: !!query,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allMovies = data?.pages.flatMap(page => page.results) || [];

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

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[2/3]">
              <Skeleton className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : allMovies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allMovies.map((movie, index) => (
              <div
                key={`${movie.id}-${index}`}
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

          {/* Loading thêm */}
          <div ref={ref} className="h-20 flex items-center justify-center mt-10">
            {isFetchingNextPage && (
              <div className="w-10 h-10 border-4 border-cineverse-cyan border-t-transparent rounded-full animate-spin"></div>
            )}
            {!hasNextPage && !isLoading && (
              <p className="text-gray-500 text-sm">You've reached the end of the results.</p>
            )}
          </div>
        </>
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