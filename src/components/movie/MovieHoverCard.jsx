import { useEffect, useRef } from "react";
import { TMDB_IMAGE_W500_URL, TMDB_IMAGE_BASE_URL } from "../../services/tmdb";

const MovieHoverCard = ({ movie, anchorRect, onClose, onPlay }) => {
    const cardRef = useRef(null);

    const CARD_WIDTH = 320;
    const VIEWPORT_W = window.innerWidth;
    const VIEWPORT_H = window.innerHeight;

    let left = anchorRect.left + anchorRect.width / 2 - CARD_WIDTH / 2;
    left = Math.max(8, Math.min(left, VIEWPORT_W - CARD_WIDTH - 8));

    let top = anchorRect.bottom + 8;
    const estimatedHeight = 340;
    if (top + estimatedHeight > VIEWPORT_H - 8) {
        top = anchorRect.top - estimatedHeight - 8;
    }

    const title = movie.title || movie.name || "Unknown";
    const year = (movie.release_date || movie.first_air_date || "").substring(0, 4);
    const rating = movie.vote_average?.toFixed(1) ?? "N/A";
    const overview = movie.overview ?? "";
    const backdropPath = movie.backdrop_path || movie.poster_path;
    const isTV = !!movie.first_air_date || (!!movie.name && !movie.title);

    return (
        <div
            ref={cardRef}
            onMouseLeave={onClose}
            style={{
                position: "fixed",
                top,
                left,
                width: CARD_WIDTH,
                zIndex: 9999,
            }}
            className="rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.8)] ring-1 ring-white/10 bg-[#1a1a1a] animate-hover-card-in"
        >
            <div className="relative w-full aspect-video overflow-hidden">
                {backdropPath ? (
                    <img
                        src={`${TMDB_IMAGE_BASE_URL}${backdropPath}`}
                        alt={title}
                        className="w-full h-full object-cover"
                        loading="eager"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />

                <button
                    onClick={onPlay}
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                    aria-label="Play"
                >
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-cineverse-cyan hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                        <svg className="w-7 h-7 fill-current text-white hover:text-black" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <h3 className="text-white font-bold text-base leading-tight line-clamp-2">
                    {title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {rating}
                    </span>
                    {year && <><span className="text-white/20">•</span><span>{year}</span></>}
                    <span className="text-white/20">•</span>
                    <span className="border border-white/20 px-1.5 py-0.5 rounded text-[10px]">
                        {isTV ? "TV" : "Movie"}
                    </span>
                </div>

                {overview && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                        {overview}
                    </p>
                )}

                <div className="flex items-center gap-2 pt-1">
                    <button
                        onClick={onPlay}
                        className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold text-xs py-2 rounded-full hover:bg-white/90 transition-all duration-200"
                    >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Play
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-all duration-200 text-white"
                        aria-label="Add to list"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-all duration-200 text-white"
                        aria-label="Like"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieHoverCard;
