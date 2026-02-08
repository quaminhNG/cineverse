import { useNavigate } from "react-router-dom";
import axios from "../services/tmdb";
import movieTrailer from "movie-trailer";

const useMovieNavigation = () => {
    const navigate = useNavigate();
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const handleMovieClick = async (movie) => {
        if (movie) {
            let trailerId = null;

            try {
                const movieVideos = await axios.get(
                    `/movie/${movie.id}/videos?api_key=${API_KEY}`
                );
                const officialTrailer = movieVideos.data.results?.find(
                    (vid) => vid.name === "Official Trailer" || (vid.type === "Trailer" && vid.site === "YouTube")
                );
                if (officialTrailer) trailerId = officialTrailer.key;
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

    return handleMovieClick;
};

export default useMovieNavigation;
